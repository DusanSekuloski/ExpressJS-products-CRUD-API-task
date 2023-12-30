const db = require('../../db-config');

exports.getAllProducts = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    const { name, short_description, description, price, product_quantity, category_id, created_at, updated_at } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO products (name, short_description, description, price, product_quantity, category_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [name, short_description, description, price, product_quantity, category_id, created_at, updated_at]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateNonQuantityProductDetails = async (req, res) => {
    const { id } = req.params;
    const { name, short_description, description, price, category_id, updated_at } = req.body;

    try {
        const result = await db.query(
            'UPDATE products SET name = $1, short_description = $2, description = $3, price = $4, category_id = $5 ,updated_at = $6, created_at = created_at WHERE id = $7 RETURNING *',
            [name, short_description, description, price, category_id, updated_at, id]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProductQuantity = async (req, res) => {
    const { id } = req.params;
    const { product_quantity, updated_at } = req.body;

    try {
        const result = await db.query(
            'UPDATE products SET product_quantity = $1, updated_at = $2 WHERE id = $3 RETURNING *',
            [product_quantity, updated_at, id]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
