const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async addProduct(product) {
    const products = await this._readFile();
    const newProduct = {
      id: this._generateId(products),
      ...product,
    };
    products.push(newProduct);
    await this._writeFile(products);
    return newProduct;
  }

  async getProducts() {
    return await this._readFile();
  }

  async getProductById(id) {
    const products = await this._readFile();
    return products.find((product) => product.id === id);
  }

  async updateProduct(id, updatedFields) {
    const products = await this._readFile();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...updatedFields,
        id,
      };
      await this._writeFile(products);
      return products[index];
    }
    return null;
  }

  async deleteProduct(id) {
    let products = await this._readFile();
    products = products.filter((product) => product.id !== id);
    await this._writeFile(products);
  }

  _generateId(products) {
    return products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1;
  }

  async _readFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  async _writeFile(products) {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, 2),
      "utf-8"
    );
  }
}

const productManager = new ProductManager("productos.json");

(async () => {
  await productManager.addProduct({
    title: "Producto 1",
    description: "Descripción del Producto 1",
    price: 19.99,
    thumbnail: "/imagenes/product1.jpg",
    code: "asd1234",
    stock: 123,
  });

  const allProducts = await productManager.getProducts();
  console.log("Todos los productos:", allProducts);

  const productById = await productManager.getProductById(1);
  console.log("Producto con ID 1:", productById);

  const updatedProduct = await productManager.updateProduct(1, {
    price: 24.99,
    stock: 90,
  });
  console.log("Producto actualizado:", updatedProduct);

  await productManager.deleteProduct(1);
  console.log("Producto eliminado.");

  const remainingProducts = await productManager.getProducts();
  console.log("Productos restantes:", remainingProducts);
})();
