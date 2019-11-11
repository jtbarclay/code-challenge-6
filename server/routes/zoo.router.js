const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// get all rows
router.get('/', (req, res) => {
    // YOUR CODE HERE
    
    const query = `
        SELECT s.id, s.species_name, c.class_name FROM species s
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

//delete row by id
router.delete('/:id', (req, res) => {
    const query = `
        DELETE FROM "species"
        WHERE "id"=$1;
    `;

    pool.query(query, [req.params.id])
        .then((response) => {
            console.log('/zoo DELETE response', response);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('/zoo DELETE error', error);
            res.sendStatus(500);
        })
})


module.exports = router;