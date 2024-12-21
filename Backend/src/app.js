const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
