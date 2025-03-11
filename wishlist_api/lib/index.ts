import express from 'express';
import bodyParser from 'body-parser';
import {Pool} from 'pg';
import cors from 'cors';
import { createNewWishlistItem, deleteSingleItemById, getAllWishlistItems } from './api_requests/req_methods';

const app = express();
const port = 2000;

const pool = new Pool ({
    user: 'postgres',
    host: 'db',
    database: 'items',
    password: '1234',
    port: 5432
});

export { pool };

const file = await Bun.file('init.psql').text();
await pool.query(file);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cors());

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

app.get ('/getAllWishlistItems', async (request, response) => {
    const results = await getAllWishlistItems();
    response.status(200).json(results);
});

app.post('/createNewWishlistItem', async (request, response) => {
    const itemname = request.body.itemname;
    const itemurl = request.body.itemurl;
    const imgurl = request.body.imgurl;
    const itemprice = Number.parseFloat(request.body.itemprice);
    const itemcolor = request.body.itemcolor;
    const itembrand = request.body.itembrand;
    const itemsize = request.body.itemsize;
    const itemcurrency = request.body.itemcurrency;

    await createNewWishlistItem(itemname, itemurl, imgurl, itemprice, itembrand, itemcolor, itemsize, itemcurrency);
    response.status(201).send("Wishlist item added");
});

app.delete('/deleteSingleItemById/:id', async (request, response) => {
    const id = request.params.id;
    await deleteSingleItemById(id);
    response.status(200).send("Wishlist item deleted");
});