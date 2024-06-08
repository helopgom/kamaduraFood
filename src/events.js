//Intenta separar los eventos en este archivo.


document.getElementById("pay-button").addEventListener("click", function() {
    Swal.fire({
        title: 'Gracias por tu Compra',
        text: '¡Pedido realizado con éxito, gracias por comprar en Kamakura Food!',
        confirmButtonText: '<img src="assets/img/close.svg" style="background-color:transparent;">',
        html:'<img src="assets/img/logo.svg" style="width:100px; height:auto;">'
    });
});

