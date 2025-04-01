import { request, response } from 'express';
import { pool } from '../index';

export async function createNewWishlistItem (itemname:string, itemurl:string, imgurl: string, itemprice: number, itembrand: string, itemcolor: string, itemsize: string, itemcurrency: string, tied_user:string) {

    const query = await pool.query('INSERT INTO items (itemname, itemurl, imgurl, itemprice, itembrand, itemcolor, itemsize, itemcurrency, tied_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [itemname, itemurl, imgurl, itemprice, itembrand, itemcolor, itemsize, itemcurrency, tied_user]);
    
    return query.rows;
}

export async function getAllWishlistItems (tied_user:string) {
    const query = await pool.query('SELECT * FROM items ORDER BY id ASC WHERE tied_user = $1', [tied_user]);
    return query.rows;
}

export async function deleteSingleItemById (tied_user:string, id:string) {

    const query = await pool.query('DELETE FROM items WHERE id = $1 AND tied_user = $2', [id, tied_user]);
    return query.rows;
    
}
