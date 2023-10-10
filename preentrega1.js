// Se crea la clase "Product"
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
  }
 // Se crea la clase "ProductManager" para gestionar el conjunto de productos 
  class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    // Método para agregar un producto
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validar que no se repita el campo "code" y que todos los campos sean obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
  
      // Verificar si ya existe un producto con el mismo código
      const existingProduct = this.products.find((product) => product.code === code);
      if (existingProduct) {
        console.error(`El producto con el código ${code} ya existe.`);
        return;
      }
  
      // Agregar el producto al arreglo con un id autoincrementable
      const newProduct = new Product(title, description, price, thumbnail, code, stock);
      newProduct.id = this.nextId++;
      this.products.push(newProduct);
      console.log(`Producto "${title}" agregado con éxito.`);
    }
  
    // Método para obtener todos los productos
    getProducts() {
      return this.products;
    }
  
    // Método para obtener un producto por su id
    getProductById(id) {
      const product = this.products.find((product) => product.id === id);
      if (!product) {
        console.error("Not Found");
      }
      return product;
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  productManager.addProduct("Playstation 5", "PS5 Standard", 800, "img/imagen1.jpg", "P1", 50);
  productManager.addProduct("Nintendo Gameboy", "Standard", 15.99, "img/imagen2.jpg", "P2", 30);
  
  console.log("Todos los productos:");
  console.log(productManager.getProducts());
  
  const productId = 2;
  const foundProduct = productManager.getProductById(productId);
  if (foundProduct) {
    console.log(`Producto encontrado: ${foundProduct.title}`);
  }
  


