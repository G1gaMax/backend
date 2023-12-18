class ProductManager {
  constructor() {
    this.products = [];
    this.nextProductId = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.error("El código ya está en uso. Por favor, elige otro código.");
      return;
    }

    const newProduct = {
      id: this.nextProductId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);

    console.log(`Producto agregado correctamente. ID: ${newProduct.id}`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado");
    }
  }
}

const productManager = new ProductManager();

productManager.addProduct(
  "Producto 1",
  "Descripción 1",
  19.99,
  "imagen1.jpg",
  "P001",
  50
);
productManager.addProduct(
  "Producto 2",
  "Descripción 2",
  29.99,
  "imagen2.jpg",
  "P002",
  30
);

console.log(productManager.getProducts());

console.log("Productos por ID:");

console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2));
