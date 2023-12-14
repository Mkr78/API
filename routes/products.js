const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.get('/', (req, res) => {
    const sql = "SELECT * FROM products"

    db.query(sql, (err, results) => {
        if (err) {
            console.log('Erreur lors de la requête')
            res.status(500).json({ message:err })
        } else {
            res.status(200).json(results)
        }
    })
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM products WHERE id = ?`
    db.query(sql, id, (err, results) => {
        if (err) {
            console.log('Erreur lors de la requête')
            res.status(500).json({ message:err })
        } else {
            res.status(200).json(results)
            console.log()
        }
    })
})

router.post('/add', (req, res) => {
    const { title, price, description } = req.body;
    const checkProductSql = 'SELECT * FROM products WHERE title = ?';

    db.query(checkProductSql, title, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.status(409).send('Un produit avec ce titre existe déjà');
        } else {
            const addProductSql = 'INSERT INTO products (title, price, description) VALUES (?, ?, ?)';
            db.query(addProductSql, [title, price, description], (err, result) => {
                if (err) throw err;
                res.status(201).send(`Produit ajouté avec succès avec l'ID ${result.insertId}`);
            });
        }
    });
});


// Route POST pour l'inscription d'un utilisateur
router.post('/users/signup', async (req, res) => {
    let { name, email, password } = req.body;

    // Vérification des champs vides
    if (!name || !email || !password) {
        return res.status(400).send('Tous les champs sont requis');
    }

    // Nettoyage et validation de l'email
    email = validator.normalizeEmail(email);
    if (!validator.isEmail(email)) {
        return res.status(400).send('Format d\'email invalide');
    }

    // Vérification de la complexité du mot de passe (ex: longueur)
    if (!validator.isStrongPassword(password, { minLength: 8 })) {
        return res.status(400).send('Le mot de passe doit être fort');
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Vérification si l'email existe déjà
    const checkUserSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserSql, email, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(409).send('Email déjà utilisé');
        } else {
            // Ajout de l'utilisateur en BDD
            const addUserSql = 'INSERT INTO users (name, email, hash) VALUES (?, ?, ?)';
            db.query(addUserSql, [name, email, hashedPassword], (err, result) => {
                if (err) throw err;
                res.status(201).send('Utilisateur créé avec succès');
            });
        }
    });
});


module.exports = router;