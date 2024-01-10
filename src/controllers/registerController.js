const db = require('../../db-config');
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
    const { first_name, last_name, email, password, created_at } = req.body;

    if (!first_name || !last_name || !email || !password || !created_at) {
        return res.status(400).json({ message: 'Some input parameters are missing' });
    }

    try {
        const duplicate = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (duplicate.rows.length > 0) {
            return res.status(409).send('Error: that email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            `INSERT INTO users (first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, created_at`,
            [first_name, last_name, email, hashedPassword, created_at]
        );

        const newUser = result.rows[0];
        res.status(201).json({
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            created_at: newUser.created_at,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createNewUser };
