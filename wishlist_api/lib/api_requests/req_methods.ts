import { request, response } from 'express';
import { pool } from '../index';

export function createNewWishlistItem () {
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
}

export function getAllWishlistItems () {
    pool.query('SELECT * FROM items ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

export function deleteSingleItemByName () {
    const itemname = request.body.itemname;
    pool.query('DELETE FROM items WHERE itemname = $1', [itemname], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send([`Item of name: ${itemname} deleted.`]);
    });
}