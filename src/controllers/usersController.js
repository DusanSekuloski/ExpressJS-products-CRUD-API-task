const db = require('../../db-config');

exports.getAllUsers = async (req, res) => {
    try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows)
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
}

exports.getUserById = async (req, res) => {
    const id = req.params;
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        if(result.rows.length > 0) {
            res.json(result.rows[0]);
        }
        else {
            res.status(404).json({message: 'User not found'})
        }
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
}

