import express from 'express';
import bodyParser from 'body-parser';
import {Pool} from 'pg';
import cors from 'cors';
import { createNewWishlistItem, deleteSingleItemByName, getAllWishlistItems } from './api_requests/req_methods';

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

app.get ('/getAllWishlistItems', (request, response) => {
    getAllWishlistItems();
});

app.post('/createNewWishlistItem', (request, response) => {
    const itemname = request.body.itemname;
    const itemurl = request.body.itemurl;
    const imgurl = request.body.imgurl;
    const itemprice = Number.parseFloat(request.body.itemprice);
    const itemcolor = request.body.itemcolor;
    const itembrand = request.body.itembrand;
    const itemsize = request.body.itemsize;

    createNewWishlistItem(itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize);

});

app.delete('/deleteSingleItemByName', (request, response) => {
    const itemname = request.body.itemname;
    deleteSingleItemByName(itemname);
});