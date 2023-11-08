// Cliente Socket.io para la vista en tiempo real

const socket = io(); // Conéctate al servidor de Socket.io

socket.on('connect', () => {
  console.log('Conexión establecida con el servidor de Socket.io');
});

// Escucha el evento 'productAdded' para actualizar la vista cuando se agrega un nuevo producto
socket.on('productAdded', (newProduct) => {
  // Agrega la lógica para actualizar la vista con el nuevo producto
  // Por ejemplo, puedes insertar el nuevo producto en la lista de productos
  console.log('Nuevo producto agregado:', newProduct);
  const productContainer = document.getElementById('product-list');
  const newProductItem = document.createElement('li');
  newProductItem.textContent = newProduct.name;
  productContainer.appendChild(newProductItem);
});

// Escucha el evento 'productDeleted' para actualizar la vista cuando se elimina un producto
socket.on('productDeleted', (productId) => {
  // Agrega la lógica para eliminar un producto de la vista
  // Por ejemplo, puedes buscar y eliminar el producto con el ID correspondiente
  console.log('Producto eliminado:', productId);
  const productContainer = document.getElementById('product-list');
  const productToDelete = Array.from(productContainer.children).find(
    (item) => item.textContent === productId
  );
  if (productToDelete) {
    productContainer.removeChild(productToDelete);
  }
});

// Puedes agregar más lógica para manejar otros eventos de Socket.io

// Ejemplo: 
// socket.on('someOtherEvent', (data) => {
//   // Agrega lógica para manejar el evento 'someOtherEvent'
// });
