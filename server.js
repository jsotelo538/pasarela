const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const USERNAME = "50285112";
const PASSWORD = "prodpassword_gYsSzHQN9yhPkqrQveagOdHITrLN5xOYbzvJ99cgGQNq8";

/* crear pago */
app.post("/create-payment", async (req, res) => {

  try {

    const { amount, currency, orderId, firstName, lastName, email } = req.body;

    const response = await axios.post(
      "https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment",
      {
        amount: amount * 10,
        currency: currency,
        orderId: orderId,
        customer: {
          email: email,
          reference: orderId,
          billingDetails: {
            firstName: firstName,
            lastName: lastName
          }
        }
      },
      {
        auth: {
          username: "50285112",
          password: "prodpassword_gYsSzHQN9yhPkqrQveagOdHITrLN5xOYbzvJ99cgGQNq8"
        }
      }
    );

    console.log("Respuesta Izipay:", response.data);

    const formToken = response.data.answer.formToken;

    res.json({
      formToken: formToken
    });

  } catch (error) {

    console.log("ERROR IZIPAY:", error.response?.data || error.message);

    res.status(500).json({
      error: "Error creando pago"
    });

  }

});
/* rutas */

app.get("/checkout", (req, res) => {
  res.sendFile(path.join(__dirname, "public/checkout.html"));
});

app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, "public/result.html"));
});

app.post("/result", (req, res) => {
  res.sendFile(path.join(__dirname, "public/result.html"));
});
app.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});