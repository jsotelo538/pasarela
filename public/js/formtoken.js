document.addEventListener("DOMContentLoaded", () => {

const formData = JSON.parse(sessionStorage.getItem("formData"));

if(!formData){
  alert("No hay datos");
  window.location.href="/";
  return;
}

const order = {

amount: formData.amount * 100,
currency: formData.currency,
orderId: formData.orderId,

customer: {
email: formData.email,
billingDetails: {
firstName: formData.firstName,
lastName: formData.lastName
}
}

};

fetch("http://localhost:3001/create-payment", {

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(order)

})
.then(res=>res.json())
.then(data=>{

if(!data.formToken){
alert("Token no recibido");
return;
}

/* TOKEN */
KR.setFormToken(data.formToken);

/* RENDER FORMULARIO */
 

/* RESPUESTA DEL PAGO */
KR.onSubmit(function(resp){

console.log(resp);

sessionStorage.setItem("paymentResult", JSON.stringify(resp));

window.location.href="/result";

});

})
.catch(err=>{
console.error(err);
});

});