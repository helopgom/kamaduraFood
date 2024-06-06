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
*/
    //FUNCIÓN BORRAR PLATO
    closeButtons.forEach(button => {
        button.addEventListener('click', function(){
            cartContainer.style.display="none";
        })
    })

    //FUNCIÓN CERRAR EL CARRITO PULSANDO EL PROPIO CARRITO

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
        button.addEventListener('click', function(event){
            const productTitle = event.target.closest('.cart-container').querySelector('h3').innerText;
            removeProductFromCart(productTitle);
        });
    });

    // FUNCIÓN PARA AÑADIR PRODUCTO AL CARRITO

        const addToCart = (product) => {
            const cartProduct = document.createElement('div');
            cartProduct.className = 'cart-container';
    
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
    
            updateCartTotal();
    
            cartProduct.querySelector('.increase-quantity').addEventListener('click', increaseQuantity);
            cartProduct.querySelector('.decrease-quantity').addEventListener('click', decreaseQuantity);
            cartProduct.querySelector('.close-button').addEventListener('click', removeProduct);
        };
    
        const updateCartTotal = () => {
            const cartProducts = cartProductsContainer.querySelectorAll('.cart-container');
            let total = 0;
    
            cartProducts.forEach(product => {
                const priceElement = product.querySelector('.text-container h5');
                const price = parseFloat(priceElement.innerText.replace('€', '').trim());
                const quantityElement = product.querySelector('.quantity');
                const quantity = parseInt(quantityElement.innerText);
                total += price * quantity;
            });
    
            document.getElementById('cart-total').innerText = `Total: € ${total.toFixed(2)}`;
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
    });
    