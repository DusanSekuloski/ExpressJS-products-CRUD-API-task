require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3500;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', require('./routes/api/products'));
app.use('/categories', require('./routes/api/categories'));
app.use('/users', require('./routes/api/users'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
