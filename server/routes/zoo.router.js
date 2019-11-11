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

//get class names
router.get('/classes', (req, res) => {
    const query = `SELECT * from "class";`;

    pool.query(query)
        .then((response) => {
            console.log('/classes GET response', response);
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('/classes GET error', error);
            res.sendStatus(500);
        })
})

// post new animal

router.post('/', (req, res) => {
    const query = `
        INSERT INTO "species" ("species_name", "class_id") 
        VALUES ($1, $2);
    `;

    pool.query(query, [req.body.newAnimal, req.body.class])
        .then((response) => {
            console.log('/zoo POST response', response);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('/zoo POST error', error);
            res.sendStatus(500);
        })
})

// post new class

router.post('/:class', (req, res) => {
    const query = `
        INSERT INTO "class" ("class_name") 
        VALUES ($1);
    `;

    pool.query(query, [req.params.class])
        .then((respons) => {
            console.log('/zoo/class POST response', response);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('/zoo/class POST error', error);
            res.sendStatus(500);
        })
})


module.exports = router;