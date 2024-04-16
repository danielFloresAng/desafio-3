import fs from "fs";

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  addProduts(item) {
    let itemsList = this.products;
    let itemListPath = this.path;
    let generateID = itemsList.reduce((sum, elem) => 1 + elem.id, 1);
    let findCode = itemsList.find((elem) => elem.code === item.code);

    !findCode
      ? itemsList.push({ ...item, id: generateID })
      : console.error(`El producto con código "${elem.code}" ya existe`);

    let listJSON = JSON.stringify(itemsList);

    const itemsListWriteFile = async () => {
      await fs.promises.writeFile(itemListPath, listJSON);
    };
    itemsListWriteFile();
  }

  getProducts() {
    const getList = async () => {
      let readItems = await fs.promises.readFile(this.path, "utf-8");
      // console.log(JSON.parse(readItems));
      return JSON.parse(readItems)
    };
    getList();
  }
  getProductsById(itemID) {
    const getById = async () => {
      let readItems = await fs.promises.readFile(this.path, "utf-8");
      let list = await JSON.parse(readItems);
      let getItem = list.find((item) => item.id === itemID);
      return getItem
        ? console.log(getItem)
        : console.error(`No se encotró el producto con ID: "${itemID}"`);
    };
    getById();
  }
  updateProduct(productID, properties) {
    const findAndModify = async () => {
      let readItems = await fs.promises.readFile(this.path, "utf-8");
      let listParse = JSON.parse(readItems);

      listParse.forEach((elem) => {
        if (productID === elem.id) {
          for (let prop in properties) {
            if (prop !== "id") {
              elem[prop] = properties[prop];
            }
          }
        }
      });
      let listJSON = JSON.stringify(listParse);
      await fs.promises.writeFile(this.path, listJSON);
    };
    findAndModify();
  }
  deleteProduct(elemId) {
    let itemsList = this.products;

    const deleteItem = async () => {
      let readItems = await fs.promises.readFile(this.path, "utf-8");
      let list = JSON.parse(readItems);
      let filterItem = list.findIndex((elem) => elem.id === elemId);

      if (filterItem !== -1) {
        itemsList.splice(filterItem, 1);
      }
      let listJSON = JSON.stringify(itemsList);
      await fs.promises.writeFile(this.path, listJSON);
    };
    deleteItem();
  }
}

/* ✓ Se creará una instancia de la clase “ProductManager” */
let manager = new ProductManager("./files/itemList.json");

manager.addProduts({
  title: "producto prueba 1",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 2,
});
// manager.addProduts({
//   title: "producto prueba 2",
//   description: "Este es un producto prueba",
//   price: 200,
//   thumbnail: "Sin imagen",
//   code: "abcddd123",
//   stock: 3,
// });
// manager.addProduts({
//   title: "producto prusdfeba 3",
//   description: "Este es un producto prueba",
//   price: 200,
//   thumbnail: "Sin imagen",
//   code: "abcddddsf123",
//   stock: 3,
// });
manager.addProduts({
  title: "producto prusdfeba 4",
  description: "Este es un producto prueba 4",
  price: 20210,
  thumbnail: "Sin imagen",
  code: "abcddddsfsdf123",
  stock: 4,
});

manager.getProducts()

export default ProductManager;
