document.getElementById("formPago").addEventListener("submit", function(e){

e.preventDefault();

const data = {

amount: document.getElementById("monto").value,
currency: "PEN",
orderId: "ORD-" + Date.now(),
firstName: document.getElementById("nombre").value,
lastName: document.getElementById("apellido").value,
email: document.getElementById("correo").value

};

sessionStorage.setItem("formData", JSON.stringify(data));

window.location.href = "/checkout";

});