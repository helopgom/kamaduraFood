//Intenta separar los eventos en este archivo.

document.getElementById("pay-button").addEventListener("click", function() {
    const modal = document.getElementById('modal-container');
    modal.classList.add('show');
});

document.getElementById("close-modal").addEventListener("click", function() {
    const modal = document.getElementById('modal-container');
    modal.classList.remove('show');
});

