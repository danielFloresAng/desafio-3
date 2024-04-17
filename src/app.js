import express from "express";
import ProductManager from "./productManager.js";


const PORT = "8080";
const app = express();
const itemsManager = new ProductManager("./files/itemList.json");

// console.log(await itemsManager.getProducts())

app.get("/products", async (req, res) => {
  const items = await itemsManager.getProducts(1);

  res.send({ status: "OK", playload: items });
});

app.listen(PORT, console.log(`Servidor funcionando en puerto ${PORT}`));

/* 
Se instalarán las dependencias a partir del comando npm install
Se echará a andar el servidor
Se revisará que el archivo YA CUENTE CON AL MENOS DIEZ PRODUCTOS CREADOS al momento de su entrega, es importante para que los tutores no tengan que crear los productos por sí mismos, y así agilizar el proceso de tu evaluación.
Se corroborará que el servidor esté corriendo en el puerto 8080.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.
*/
