const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
// WE KNOW, FOR SURE, THIS ROUTE HAS '/api/'


router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "books";';

    pool.query(queryText)
        .then((result) => {
            console.log(result)
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error: ', err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    const book = req.body;
    const queryText = `INSERT INTO "books" ("title", "author", "published")
                        VALUES ($1, $2, $3);`;
    
    pool.query(queryText, [book.title, book.author, book.published ])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error posting: ', err);
            res.sendStatus(500);
        });

});

module.exports = router;