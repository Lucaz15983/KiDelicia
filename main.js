const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-Total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("Car-point")
const addressImput = document.getElementById("address")
const addressWarn = document.getElementById("Address-warn")
const addToCartBtn = document.getElementById('add-to-cart-btn');
const notification = document.getElementById('cart-notification');

//Popup de Notificação "ADICIONADO AO CARRINHO"
menu.addEventListener('click', function() {
    showNotification();
  });

  function showNotification() {
    notification.classList.remove('show'); // Remove a classe show, se existir
    void notification.offsetWidth; // Força a reflow
    notification.classList.add('show'); // Adiciona a classe show

    setTimeout(() => {
      notification.classList.remove('show');
    }, 500); // Oculta a notificação após 3 segundos
  }
//Popup de Notificação "ADICIONADO AO CARRINHO"

//Slides de Imagens
const images = [
    './Assets/img 1.png',
    './Assets/img.png',
  ];

  let currentIndex = 0;
  const imageElement = document.getElementById('slideshow-image');

  function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    imageElement.src = images[currentIndex];
  }

  setInterval(changeImage, 3000);
let cart = [];
//Slides de Imagens

//MODAL DO CARRINHO DE COMPRAS "ABRIR E FECHAR"
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex"
    
})

cartModal.addEventListener("click", function(event) {
 if(event.target === cartModal){
    cartModal.style.display = "none"
 }
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display ="none"
})

menu.addEventListener("click", function(event){

    let parentButton = event.target.closest(".botão")

   if(parentButton){
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))
    addToCart(name, price)
   }

})
 
function addToCart(name,price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1;
    }else{

        cart.push({
            name,
            price,
            quantity: 1,
        })  
    }

    updateCartModal()

}


function updateCartModal(){
  cartItemsContainer.innerHTML ="";
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("carr")
     
    cartItemElement.innerHTML = `
    <div class="Ia">
       <div>
          <p class="T">${item.name}</p>
          <p>Qtd: ${item.quantity}</p>
          <p class="M">R$ ${item.price.toFixed(2)}</p>
       </div>

         <button class="B" data-name="${item.name}">
         Remover
         </button>

    </div>
 `

 total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement)

  })

  cartTotal.textContent = total.toLocaleString("pt-BR",{
    style:"currency",
    currency: "BRL"
  });
 
  cartCounter.innerHTML = cart.length;
  
}

cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("B")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
     
    if(item.quantity > 1){
        item.quantity -= 1;
        updateCartModal();
        return;
    }    

    cart.splice(index, 1);
    updateCartModal();

    }
}


addressImput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !==""){
        addressWarn.classList.add("zidden")
    }
})


checkoutBtn.addEventListener("click", function(){
    if(cart.length === 0) return;
    if(addressImput.value ===""){
        addressWarn.classList.remove("zidden")
        return;
    }
//API DO WHATSAPP
    const cartItems = cart.map((item) => {
        return (
            `${item.name} Quantidade: (${item.quantity}) Preço: R$ ${item.price} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "63992840409"

    window.open(`https://wa.me/${phone}?text=${message} Nome e N° da Mesa: ${addressImput.value}`, "_blank")

    cart = []; 
    updateCartModal();
})
//API DO WHATSAPP

// Modal Sucos Opções
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex";
});

cartModal.addEventListener("click", function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none";
});
//MODAL DO CARRINHO DE COMPRAS "ABRIR E FECHAR"

// Lidar com o modal de itens
var modal = document.getElementById("myModal");
var openModalBtn = document.getElementById("openModalBtn");
var closeBtn = document.getElementsByClassName("close")[0];

openModalBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Modal Sucos Opções