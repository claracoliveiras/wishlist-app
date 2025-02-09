import express from 'express';
import bodyParser from 'body-parser';
import {Pool} from 'pg';
import cors from 'cors';

const app = express();
const port = 2000;

const pool = new Pool ({
    user: 'postgres',
    host: 'db',
    database: 'items',
    password: '1234',
    port: 5432
});

const file = await Bun.file('init.psql').text();
await pool.query(file);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cors());

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'});
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

app.get ('/getWishlistItems', (request, response) => {
    pool.query('SELECT * FROM items ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
});

app.post('/createNewItem', (request, response) => {
    const itemname = request.body.itemname;
    const itemurl = request.body.itemurl;
    const imgurl = request.body.imgurl;
    const itemprice = Number.parseFloat(request.body.itemprice);
    const itemcolor = request.body.itemcolor;
    const itembrand = request.body.itembrand;
    const itemsize = request.body.itemsize;

    pool.query('INSERT INTO items (itemname, itemurl, imgurl, itemprice, itembrand, itemcolor, itemsize) VALUES ($1, $2, $3, $4, $5, $6, $7)', [itemname, itemurl, imgurl, itemprice, itembrand, itemcolor, itemsize], (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(201).send('Item added');
    });
    
});

app.delete('/deleteItem', (request, response) => {
    const itemname = request.body.itemname;

    pool.query('DELETE FROM items WHERE itemname = $1', [itemname], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send([`Item of name: ${itemname} deleted.`]);
    });
});