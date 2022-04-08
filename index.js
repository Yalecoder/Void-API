require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
var cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ACCEPTED_URL = [
  process.env.ACCEPT_DEV_URL,
  process.env.ACCEPT_DEV_URL_1,
  process.env.ACCEPT_PRODUCTION,
];

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(
  cors({
    origin: ACCEPTED_URL,
    credentials: true,
  })
);

app.use("/static", express.static("uploads"));

const contacto = require("./Router/contactoRouter");

app.use("/", contacto);

app.listen(PORT, () => {
  console.log(PORT);
});
