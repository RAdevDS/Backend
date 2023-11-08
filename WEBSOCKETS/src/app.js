import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import exphbs from 'express-handlebars'; // Importa 'express-handlebars' sin rutas relativas


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server); // Crea un servidor de Socket.io

const PORT = 8080;

const productsFilePath = path.join(__dirname, './data/productos.json');
const cartsFilePath = path.join(__dirname, './data/carrito.json');

app.use(express.json());

// Configura Handlebars como motor de plantillas
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.static('public')); // Carpeta para archivos estáticos
app.use('/api/products', productsRouter(productsFilePath, io));
app.use('/api/carts', cartsRouter(cartsFilePath));

// Ruta para la vista que muestra la lista de productos en tiempo real
app.get('/realTimeProducts', (req, res) => {
  const products = []; // Debes obtener los productos de tu base de datos

  // Renderiza la vista 'realTimeProducts' utilizando Handlebars
  res.render('realTimeProducts', { products });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
