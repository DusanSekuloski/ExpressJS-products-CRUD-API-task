const db = require('../../db-config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.query('SELECT id, email, password FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const id = user.rows[0].id.toString();
        const hashedPasswordFromDB = user.rows[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);

        if (passwordMatch) {
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        id: id,
                        email: email,
                    },
                },
                // @ts-ignore
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '180s' }
            );

            res.status(200).json({ message: 'Login successful', accessToken: accessToken });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
