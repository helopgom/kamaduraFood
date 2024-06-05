//Aquí intenta poner las funcionalidades del recibo
document.addEventListener("DOMContentLoaded", function() {
    const closeButtons = document.querySelectorAll('.close-button');
    const addButtons = document.querySelectorAll('.add-button');

//FUNCIÓN PARA MOSTRAR EL RECIBO
const proceedPayButton = document.getElementById('proceedPay-button');
const receiptContainer = document.getElementById('receipt-container');
proceedPayButton.addEventListener('click', function() {
    receiptContainer.style.display = 'flex';
});

// BOTÓN PARA CERRAR EL RECIBO
const closeReceiptButton = document.getElementById('close-receipt');
closeReceiptButton.addEventListener('click', function() {
    receiptContainer.style.display = 'none';
});


});