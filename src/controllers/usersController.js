const db = require('../../db-config');

exports.getAllUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLoggedInUser = async (req, res) => {
    const id = req.user.id;
    const { first_name, last_name } = req.body;
    try {
        const result = await db.query('UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *', [
            first_name,
            last_name,
            id,
        ]);

        if (result.rows.length > 0) {
            const updatedInfo = result.rows[0];
            res.status(201).json({
                first_name: updatedInfo.first_name,
                last_name: updatedInfo.last_name,
            });
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING*', [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
