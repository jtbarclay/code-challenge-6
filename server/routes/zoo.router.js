const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    // YOUR CODE HERE
    
    const query = `
        SELECT s.species_name, c.class_name FROM species s
        JOIN "class" c ON c.id=s.class_id;
    `;

    pool.query(query)
        .then((response) => {
            console.log('/zoo GET response', response);
            res.send(response.rows);
        })
        .catch((error) => {
            console.log('/zoo GET error', error);
            res.sendStatus(500);
        })
});

module.exports = router;