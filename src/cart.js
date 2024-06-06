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

            // Añadir event listener para eliminar producto
            productDiv.querySelector('.close-button').addEventListener('click', function() {
                removeProductFromCart(product.title);
            });

            // Añadir event listener para aumentar cantidad
            productDiv.querySelector('.increase-quantity').addEventListener('click', function() {
                product.quantity++;
                updateCartUI();
            });

            // Añadir event listener para disminuir cantidad
            productDiv.querySelector('.decrease-quantity').addEventListener('click', function() {
                if (product.quantity > 1) {
                    product.quantity--;
                }
                updateCartUI();
            });

            cartProductsContainer.appendChild(productDiv);
        });
        updateTotal();
    }
});

