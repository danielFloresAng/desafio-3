import express from "express";
import ProductManager from "./productManager.js";
// import { miNaomi } from "./files/sdf.js";

const PORT = "8080";
const app = express();
const itemsManager = new ProductManager("./files/itemList.json");

itemsManager.getProducts();

app.get("/products", async (req, res) => {
  res.send(await itemsManager.getProducts());
});

app.listen(PORT, console.log(`Servidor funcionando en puerto ${PORT}`));


