const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./controllers/productsController');
const setTimestamp = require('./middleware/timestampMiddleware');

const app = express();

app.use(express.json());
app.use(setTimestamp);

dotenv.config();

const port = process.env.PORT || 3500;

app.get('/', (req, res) => {
    res.send('Hello, this is a simple GET request!');
});

app.get('/products', productRoutes.getAllProducts);
app.get('/products/:id', productRoutes.getProductById);
app.post('/products', productRoutes.createProduct);
app.put('/products/:id', productRoutes.updateProduct);
app.delete('/products/:id', productRoutes.deleteProduct);

app.listen(3500, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
