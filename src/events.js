//Intenta separar los eventos en este archivo.


document.getElementById("pay-button").addEventListener("click", function() {
    const cartProducts = document.querySelectorAll('.cart-container');
    const receiptProductContainer = document.getElementById('receipt-product');
    const payButton = document.getElementById('pay-button');

    // Eliminar mensaje previo si existe
    let existingMessage = document.querySelector('.empty-cart-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    let total = 0;
    cartProducts.forEach(product => {
        const priceText = product.querySelector('.text-container h5').textContent;
        const price = parseFloat(priceText.match(/[\d.]+/));
        const quantity = parseInt(product.querySelector('.quantity-container .quantity').textContent);
        if (!isNaN(price) && !isNaN(quantity)) {
            total += price * quantity;
        }
    });

    if (cartProducts.length === 0 || total === 0) {
        // Mostrar mensaje debajo del botón de pagar
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.style.color = 'red';  // Estilo de color rojo
        emptyMessage.textContent = 'Tu orden está vacía';
        payButton.insertAdjacentElement('afterend', emptyMessage);
    } else {
        // Mostrar el pop-up de confirmación de compra
        const modal = document.getElementById('modal-container');
        modal.classList.add('show');
    }
});

document.getElementById("close-modal").addEventListener("click", function() {
    const modal = document.getElementById('modal-container');
    modal.classList.remove('show');
});









