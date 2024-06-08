// Variables globales
let cartProductsContainer;
let cartTotal;
let isPaymentInProgress = false;

// FUNCIÓN PARA LIMPIAR EL CARRITO
export const clearCart = () => {
    if (cartProductsContainer) {
        cartProductsContainer.innerHTML = '';
        updateCartTotal();
    }
};

// FUNCIÓN PARA ACTUALIZAR EL TOTAL DEL CARRITO
export const updateCartTotal = () => {
    const cartProducts = cartProductsContainer.querySelectorAll('.cart-container');
    let total = 0;

    cartProducts.forEach(product => {
        const priceElement = product.querySelector('.text-container h5');
        const price = parseFloat(priceElement.innerText.replace('€', '').trim());
        const quantityElement = product.querySelector('.quantity');
        const quantity = parseInt(quantityElement.innerText);
        total += price * quantity;
    });

    cartTotal.innerText = `Total: € ${total.toFixed(2)}`;
};

// FUNCIÓN PARA OCULTAR EL CONTENEDOR DE PRODUCTOS DEL CARRITO
export const hideCartProductsContainer = () => {
    cartProductsContainer.style.display = 'none';
};

document.addEventListener("DOMContentLoaded", function() {
    const cartButton = document.getElementById('cart');
    const cartContainer = document.getElementById('cart-container');
    const closeButtons = document.querySelectorAll('.close-button');
    cartProductsContainer = document.getElementById('cart-products');
    cartTotal = document.getElementById('cart-total');
    let cart = [];
    let total = 0;

    // Eliminar el div inicial del carrito de muestra
    const initialCartProduct = cartProductsContainer.querySelector('.cart-container');
    if (initialCartProduct) {
        initialCartProduct.remove();
    }

    // FUNCIÓN PARA MOSTRAR EL CARRITO
    cartButton.addEventListener('click', function() {
        if (cartContainer.style.display === 'none' || cartContainer.style.display === '') {
            cartContainer.style.display = 'flex';
        } else {
            cartContainer.style.display = 'none';
        }
    });

    // FUNCIÓN BORRAR PLATO
    function removeProductFromCart(productTitle) {
        cart = cart.filter(product => product.title !== productTitle);
        updateCartUI();
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productTitle = event.target.closest('.cart-container').querySelector('h3').innerText;
            removeProductFromCart(productTitle);
        });
    });

    // FUNCIÓN PARA AÑADIR PRODUCTO AL CARRITO
    const addToCart = (product) => {
        if (isPaymentInProgress) return; // No añadir productos si el pago está en progreso

        // Comprobar si el producto ya está en el carrito
        const existingProduct = cartProductsContainer.querySelector(`.cart-container[data-name="${product.name}"]`);
        if (existingProduct) {
            // Incrementar la cantidad si el producto ya existe en el carrito
            const quantityElement = existingProduct.querySelector('.quantity');
            let quantity = parseInt(quantityElement.innerText);
            quantity++;
            quantityElement.innerText = quantity;
        } else {
            // Añadir un nuevo producto si no está en el carrito
            const cartProduct = document.createElement('div');
            cartProduct.className = 'cart-container';
            cartProduct.setAttribute('data-name', product.name);

            cartProduct.innerHTML = `
                <button class="close-button"><img src="./assets/img/close.svg" alt="close"></button>
                <div class="text-container">
                    <h3>${product.name}</h3>
                    <h5>€ ${product.price.toFixed(2)}</h5>
                </div>
                <div class="quantity-container" id="quantity">
                    <button class="increase-quantity">+</button>
                    <p class="quantity">1</p>
                    <button class="decrease-quantity">-</button>
                </div>
            `;

            cartProductsContainer.appendChild(cartProduct);

            cartProduct.querySelector('.increase-quantity').addEventListener('click', increaseQuantity);
            cartProduct.querySelector('.decrease-quantity').addEventListener('click', decreaseQuantity);
            cartProduct.querySelector('.close-button').addEventListener('click', removeProduct);
        }

        updateCartTotal();
    };

    const increaseQuantity = (event) => {
        const quantityElement = event.target.nextElementSibling;
        let quantity = parseInt(quantityElement.innerText);
        quantity++;
        quantityElement.innerText = quantity;
        updateCartTotal();
    };

    const decreaseQuantity = (event) => {
        const quantityElement = event.target.previousElementSibling;
        let quantity = parseInt(quantityElement.innerText);
        if (quantity > 1) {
            quantity--;
            quantityElement.innerText = quantity;
            updateCartTotal();
        } else if (quantity === 1) {
            // Eliminar el producto si la cantidad llega a cero
            const productContainer = event.target.closest('.cart-container');
            productContainer.remove();
            updateCartTotal();
        }
    };

    const removeProduct = (event) => {
        const productContainer = event.target.closest('.cart-container');
        productContainer.remove();
        updateCartTotal();
    };

    // Event listener for "Añadir" buttons
    document.getElementById('products').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-button')) {
            const productContainer = event.target.closest('.product-container');
            const productName = productContainer.querySelector('h3').innerText;
            const productPrice = parseFloat(productContainer.querySelector('.price-container h5').innerText.replace('€', '').trim());
            const product = {
                name: productName,
                price: productPrice
            };
            addToCart(product);
        }
    });

    // FUNCIÓN PARA ACTUALIZAR LA INTERFAZ DEL CARRITO
    const updateCartUI = () => {
        cartProductsContainer.innerHTML = '';
        cart.forEach(product => {
            addToCart(product);
        });
        updateCartTotal();
    };
});
