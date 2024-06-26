import { products, filters } from "../assets/data/data.js" // importamos lo que fuera necesario para ejecutar las funciones que fueramos a usar

//DEBE imprimir en pantalla la información de filtros.
document.addEventListener("DOMContentLoaded", () => {
    const filtersContainer = document.getElementById('filters');
    const productContainer = document.getElementById('products');

    // Imprimir los filtros {
    function renderFilters() {
        filtersContainer.innerHTML = '';
        filters.forEach(filter => {
            const button = document.createElement('button');
            button.className = 'filter';
            button.textContent = filter;
            button.addEventListener('click', () => filterProducts(filter));
            filtersContainer.appendChild(button);
        });
    }

    //DEBE imprimir en pantalla los productos, con su Título, descripción y precio en € y botón añadir.

    // Función para imprimir los productos
    const printProducts = (productsToDisplay) => {
        productContainer.innerHTML = '';
        productsToDisplay.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-container';

            const productTitle = document.createElement('h3');
            productTitle.textContent = product.name;
            productDiv.appendChild(productTitle);

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;
            productDiv.appendChild(productDescription);

            const priceContainer = document.createElement('div');
            priceContainer.className = 'price-container';

            const productPrice = document.createElement('h5');
            productPrice.textContent = `€ ${product.price.toFixed(2)}`;
            priceContainer.appendChild(productPrice);

            const addButton = document.createElement('button');
            addButton.className = 'add-button';
            addButton.textContent = 'Añadir';
            // Aquí se puede agregar un event listener para manejar la lógica de añadir al carrito
            priceContainer.appendChild(addButton);

            productDiv.appendChild(priceContainer);

            productContainer.appendChild(productDiv);
        });
    };

    // De esta forma se imprimen todos los productos inicialmente
    printProducts(products);

    // Función para filtrar productos
    const filterProducts = (filter) => {
        if (filter === 'todos') {
            printProducts(products);
        } else {
            const filteredProducts = products.filter(product => product.category === filter);
            printProducts(filteredProducts);
        }  
    };

    renderFilters();

});
