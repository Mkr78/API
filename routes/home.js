const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.get('/', (req, res) => {
    res.status(200).send("Bienvenue sur mon API")
})


module.exports = router;