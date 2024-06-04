//DEBE contener las funcionalidades del carrito de compras.
document.addEventListener("DOMContentLoaded", function() {
    const cartButton = document.getElementById('cart');
    const cartContainer = document.getElementById('cart-container');
    const closeButtons = document.querySelectorAll('.close-button');
    const addButtons = document.querySelectorAll('.add-button');
    const cartProductsContainer = document.getElementById('cart-products');
    const cartTotal = document.getElementById('cart-total');
    let cart = [];
    let total = 0;

    // FUNCIÓN PARA MOSTRAR EL CARRITO
    /*cartButton.addEventListener('click', function() {
        cartContainer.style.display = 'flex';
    });

    //FUNCIÓN CERRAR CARRITO CON LA X
    closeButtons.forEach(button => {
        button.addEventListener('click', function(){
            cartContainer.style.display="none";
        })
    })*/

    //FUNCIÓN CERRAR EL CARRITO PULSANDO EL PROPIO CARRITO

    cartButton.addEventListener('click', function() {
        if (cartContainer.style.display === 'none' || cartContainer.style.display === '') {
            cartContainer.style.display = 'flex';
        } else {
            cartContainer.style.display = 'none';
        }
    });
    
    

    // FUNCIÓN PARA ACTUALIZAR EL TOTAL DEL CARRITO
    function updateTotal() {
        total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
        cartTotal.innerText = `Total: ${total}€`;
    }

    //
});
