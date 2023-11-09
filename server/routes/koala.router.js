const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg');
// DB CONNECTION
const pool = new pg.Pool({
    hostname: 'Christian',
    port: 5432,
    database: 'koalas'
})

// GET
koalaRouter.get('/', (req, res) => {
    const sqlQueryText = `
        SELECT * FROM "koalas"
    `
    pool.query(sqlQueryText)
        .then((dbResult) => {
            console.log('dbResult', dbResult.rows);
            res.send(dbResult.rows);
        }).catch((dbError) => {
            res.sendStatus(500);
        })
})
// POST


// PUT


// DELETE

module.exports = koalaRouter;