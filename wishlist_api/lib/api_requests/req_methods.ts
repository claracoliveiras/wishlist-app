import { request, response } from 'express';
import { pool } from '../index';

export async function createNewWishlistItem (itemname:string, itemurl:string, imgurl: string, itemprice: number, itembrand: string, itemcolor: string, itemsize: string, itemcurrency: string) {

    const query = await pool.query('INSERT INTO items (itemname, itemurl, imgurl, itemprice, itembrand, itemcolor, itemsize, itemcurrency) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [itemname, itemurl, imgurl, itemprice, itembrand, itemcolor, itemsize, itemcurrency]);
    
    return query.rows;
}

export async function getAllWishlistItems () {
    const query = await pool.query('SELECT * FROM items ORDER BY id ASC');
    return query.rows;
}

export async function deleteSingleItemById (id:string) {

    const query = await pool.query('DELETE FROM items WHERE id = $1', [id]);
    return query.rows;
    
}