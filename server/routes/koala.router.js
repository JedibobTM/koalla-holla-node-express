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
        ORDER BY "id";
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
koalaRouter.post('/', (req, res) => {
    console.log(req.body);
    // console.log(sqlValues, "are the sql values");
    const sqlQueryText = `
        INSERT INTO "koalas"
            ("name", "age", "gender", "transfer_status", "notes")
            VALUES
            ($1, $2, $3, $4, $5);
    `
    const sqlValues = [req.body.name, req.body.age, req.body.gender, req.body.transfer_status, req.body.notes];
    console.log(sqlValues, "are the values");
    pool.query(sqlQueryText, sqlValues)
        .then((dbResult) => {
            res.sendStatus(201);
            console.log('POST successful');
        }).catch((dbError) => {
            res.sendStatus(500);
        })
})

// PUT
koalaRouter.put('/:id', (req, res) => {
    console.log('hopefully this works');
    let idofKoala = req.params.id;

    const sqlQueryText = `
    UPDATE "koalas"
    SET "transfer_status" = NOT "transfer_status"
    WHERE "id" = ($1);
    `

    const sqlValues = [idofKoala];

    pool.query(sqlQueryText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(201);
        console.log('PUT successful');
    }).catch((dbError) => {
        res.sendStatus(500);
    })

})

// DELETE

koalaRouter.delete(`/:id`, (req, res) => {
    const sqlQueryText =
    `
    DELETE FROM "koalas"
      WHERE   "id" = ($1);
    `
    const sqlValues = [
      req.params.id
    ]
    // console.log(`sql Values from html`, req.params);
    pool.query(sqlQueryText, sqlValues)
      .then((dbResult) => {
        res.sendStatus(200)
      })
      .catch((dbError) => {
        console.log(`DELETE /koalas SQL query failed: `, dbError)
        res.sendStatus(500)
      })
  });

module.exports = koalaRouter;