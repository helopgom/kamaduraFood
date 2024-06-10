import { updateCartTotal, hideCartProductsContainer } from './cart.js';

document.addEventListener("DOMContentLoaded", function() {
    const proceedPayButton = document.getElementById('proceedPay-button');
    const receiptContainer = document.getElementById('receipt-container');

    // FUNCIÓN PARA MOSTRAR EL RECIBO
    proceedPayButton.addEventListener('click', function() {
        // Ocultar el contenedor de productos del carrito
        hideCartProductsContainer();

        // Calcular el total y mostrar los productos en el recibo
        const cartProducts = document.querySelectorAll('.cart-container');
        const receiptProductContainer = document.getElementById('receipt-product');

        receiptProductContainer.innerHTML = ''; // Limpiar recibo previo
              
       if(cartProducts.length===0){
        //Mostrar el mensaje de carrito vacío
        receiptProductContainer.innerHTML = '<h3>Aún no has escogido tu orden </h3>';
       }else{
        
       }
             let total = 0;
        cartProducts.forEach(product => {
            const title = product.querySelector('.text-container h3').textContent;
            const priceText = product.querySelector('.text-container h5').textContent;
            const price = parseFloat(priceText.match(/[\d.]+/));
            const quantity = parseInt(product.querySelector('.quantity-container .quantity').textContent);

            if (!isNaN(price) && !isNaN(quantity)) {
                // Crear un elemento de producto para el recibo
                const receiptProduct = document.createElement('div');
                receiptProduct.className = 'receipt-product';
                receiptProduct.innerHTML = `
                    <h3>${title}</h3>
                    <div class="receipt-price">
                        <p>Cantidad: ${quantity}</p>
                        <h5>Subtotal: €${(price * quantity).toFixed(2)}</h5>
                    </div>
                `;
                receiptProductContainer.appendChild(receiptProduct);

                // Añadir al total
                total += price * quantity;
            }
            
        });

        // Mostrar el total en el recibo
        const receiptTotal = document.getElementById('receipt-total');
        receiptTotal.textContent = `Total: €${total.toFixed(2)}`;
        receiptContainer.style.display = 'flex';
    });


// Calcular el total y mostrar los productos en el recibo
const cartProducts = document.querySelectorAll('.cart-container');
const receiptProductContainer = document.getElementById('receipt-product');

receiptProductContainer.innerHTML = ''; // Limpiar recibo previo

if (cartProducts.length === 0) {
    // Mostrar mensaje de carrito vacío
    receiptProductContainer.innerHTML = '<p>No tienes nada en el carrito aún</p>';
} else {
    let total = 0;
    cartProducts.forEach(product => {
        const title = product.querySelector('.text-container h3').textContent;
        const priceText = product.querySelector('.text-container h5').textContent;
        const price = parseFloat(priceText.match(/[\d.]+/));
        const quantity = parseInt(product.querySelector('.quantity-container .quantity').textContent);

        if (!isNaN(price) && !isNaN(quantity)) {
            // Crear un elemento de producto para el recibo
            const receiptProduct = document.createElement('div');
            receiptProduct.className = 'receipt-product';
            receiptProduct.innerHTML = `
                <h3>${title}</h3>
                <div class="receipt-price">
                    <p>Cantidad: ${quantity}</p>
                    <h5>Subtotal: €${(price * quantity).toFixed(2)}</h5>
                </div>
            `;
            receiptProductContainer.appendChild(receiptProduct);

            // Añadir al total
            total += price * quantity;
        }
    });

    // Mostrar el total
    const totalElement = document.createElement('h3');
    totalElement.id = 'receipt-total';
    totalElement.textContent = `Total: €${total.toFixed(2)}`;
    receiptProductContainer.appendChild(totalElement);
}


    // BOTÓN PARA CERRAR EL RECIBO
    const closeReceiptButton = document.getElementById('close-receipt');
    closeReceiptButton.addEventListener('click', function() {
        receiptContainer.style.display = 'none';
    });

    // Actualizar el total del carrito
    updateCartTotal();
});

