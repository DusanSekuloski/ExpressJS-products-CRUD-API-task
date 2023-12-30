const db = require('../../db-config.js');

exports.getAllCategories = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM categories');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    const { category_id } = req.params;

    try {
        const result = await db.query('SELECT * FROM categories WHERE category_id = $1', [category_id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCategory = async (req, res) => {
    const { category_name, created_at, updated_at } = req.body;

    try {
        const result = await db.query('INSERT INTO categories (category_name, created_at, updated_at) VALUES ($1, $2, $3) RETURNING *', [
            category_name,
            created_at,
            updated_at,
        ]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    const { category_id } = req.params;
    const { category_name, updated_at } = req.body;

    try {
        const result = await db.query(
            'UPDATE categories SET category_name = $1, updated_at = $2 WHERE category_id = $3 RETURNING *',
            [category_name, updated_at, category_id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    const { category_id } = req.params;
    try {
        const result = await db.query('DELETE FROM categories WHERE category_id = $1 RETURNING *', [category_id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
