

document.addEventListener("DOMContentLoaded", function() {
    const closeButtons = document.querySelectorAll('.close-button');
    const addButtons = document.querySelectorAll('.add-button');

    // FUNCIÓN PARA MOSTRAR EL RECIBO
    const proceedPayButton = document.getElementById('proceedPay-button');
    const receiptContainer = document.getElementById('receipt-container');
    proceedPayButton.addEventListener('click', function() {
        // Calcular el total y mostrar los productos en el recibo
        const cartProducts = document.querySelectorAll('.cart-container');
        const receiptProductContainer = document.getElementById('receipt-product');
        
        receiptProductContainer.innerHTML = ''; // Limpiar recibo previo
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
        cartContainer.style.display = 'none';
    });

    // BOTÓN PARA CERRAR EL RECIBO
    const closeReceiptButton = document.getElementById('close-receipt');
    closeReceiptButton.addEventListener('click', function() {
        receiptContainer.style.display = 'none';
    });

    // Otros event listeners pueden ir aquí (si los necesitas para añadir productos o cerrar productos individuales)
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Código para cerrar el producto del carrito
            button.parentElement.remove();
            // Opcional: actualizar el total del carrito si se eliminan productos
            updateCartTotal();
        });
    });

    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Código para añadir productos al carrito
            // Opcional: actualizar el total del carrito si se añaden productos
            updateCartTotal();
        });
    });

    // Calcular el total del carrito
    function updateCartTotal() {
        const priceElements = document.querySelectorAll(".cart-container .text-container h5");
        let total = 0;

        priceElements.forEach(element => {
            const priceText = element.textContent;
            const price = parseFloat(priceText.match(/[\d.]+/));
            const quantity = parseInt(element.closest('.cart-container').querySelector('.quantity-container .quantity').textContent);
            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        });

        const totalElement = document.getElementById("cart-total");
        totalElement.textContent = `Total: €${total.toFixed(2)}`;
    }

    // Inicializa el total del carrito al cargar la página
    updateCartTotal();
});

