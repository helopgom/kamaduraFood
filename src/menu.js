import { products, filters } from "../assets/data/data.js"

//DEBE imprimir en pantalla la información de filtros.
document.addEventListener("DOMContentLoaded", () => {
    const filtersContainer = document.getElementById('filters');
    const productContainer = document.getElementById('products');
  

filters.forEach(filter => {
    const filterButton = document.createElement('button');
    filterButton.className = 'filter';
    filterButton.textContent = filter;
    filterButton.addEventListener('click', () => filterProducts(filter));
    filtersContainer.appendChild(filterButton);
});});


//DEBE imprimir en pantalla los productos, con su Título, descripción y precio en € y botón de añadir.