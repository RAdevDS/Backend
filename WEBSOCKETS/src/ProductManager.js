import fs from 'fs/promises';

export class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  // Método para agregar un producto
  addProduct(product) {
    let products = this.getProducts();
    if (!Array.isArray(products)) {
        // Si no es un array (puede ocurrir si el archivo está vacío o no contiene un JSON válido),
        // inicializamos products como un array vacío.
        products = [];
    }

    const lastId = products.length > 0 ? products[products.length - 1].id : 0;
    product.id = lastId + 1;
    products.push(product);
    this.saveProducts(products);
    return product;
  }

  // Método para obtener todos los productos
  async getProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      const parsedData = JSON.parse(data);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      return [];
    }
  }

  // Método para buscar un ID de producto
  getProductById(id) {
    const products = this.getProducts(); 
    const product = products.findIndex((product) => product.id == id);
    return product || null;
  }

  // Método para actualizar un producto
  updateProduct(id, updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id == id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct, id };
      this.saveProducts(products);
      return products[index];
    } else {
      return null; // Producto no encontrado
    }
  }

  // Método para eliminar un producto por su id
  deleteProductById(id) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id == id);
    if (index !== -1) {
        products.splice(index, 1);
        this.saveProducts(products);
    }
  }

  // Método para guardar productos en el archivo
  saveProducts(products) {
    fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }
}

const productManager = new ProductManager('products.json');
export default productManager; 




//Agregar 10 productos
// for (let i = 1; i <= 10; i++) {
  // productManager.addProduct({
    // title: `Producto ${i}`,
    // description: `Descripción ${i}`,
    // price: 10.99 * i,
    // thumbnail: `imagen${i}.jpg`,
    // code: `P${i}`,
    // stock: 50 + i,
  // });
// }

//Agregar un producto
// const newProduct = productManager.addProduct({
  // title: 'Producto 11',
  // description: 'Descripción 11',
  // price: 10.99,
  // thumbnail: 'imagen11.jpg',
  // code: 'P11',
  // stock: 500,
// });

// console.log('Producto agregado:', newProduct);

//Obtener un producto por ID



//Eliminar un producto
// productManager.deleteProduct(productIdToFind);
// console.log('Producto eliminado.');

//Obtener todos los productos
// const allProducts = productManager.getProducts();
// console.log('Todos los productos:', allProducts);