import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {Pool} from 'pg';
import cors from 'cors';
import { createNewWishlistItem, deleteSingleItemById, getAllWishlistItems } from './api_requests/req_methods';
import { registerNewUser, userLogin } from './api_requests/users';
import cookieSession from 'cookie-session';

const app = express();
const port = 2000;

if(!Bun.env.COOKIE_SECRET || !Bun.env.DB_USER || !Bun.env.DB_HOST || !Bun.env.DB_NAME || !Bun.env.DB_PASSWORD) {
    throw new Error("There's something missing in the .env file");
}

const pool = new Pool ({
    user: Bun.env.DB_USER,
    host: Bun.env.DB_HOST,
    database: Bun.env.DB_NAME,
    password: Bun.env.DB_PASSWORD,
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

app.use(cookieSession({
    name: 'session',
    keys: [Bun.env.COOKIE_SECRET],
    secure: true,
    sameSite: 'lax'
    // domain: '.claras.studio'
}));

app.use(cors());

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

app.get ('/getAllWishlistItems/', async (request, response) => {
    
    const tied_user = request.session?.tied_user;
    if(!tied_user) {
        response.sendStatus(403);
    } else {
        const results = await getAllWishlistItems(tied_user);
        response.status(200).json(results);
    }

    
});

app.post('/createNewWishlistItem', async (request, response) => {
    const tied_user = request.session?.tied_user;
    console.log(tied_user);
    if(!tied_user) {
        
        response.sendStatus(403);
        return;
    }

    const itemname = request.body.itemname;
    const itemurl = request.body.itemurl;
    const imgurl = request.body.imgurl;
    const itemprice = Number.parseFloat(request.body.itemprice);
    const itemcolor = request.body.itemcolor;
    const itembrand = request.body.itembrand;
    const itemsize = request.body.itemsize;
    const itemcurrency = request.body.itemcurrency;

    await createNewWishlistItem(itemname, itemurl, imgurl, itemprice, itembrand, itemcolor, itemsize, itemcurrency, tied_user);
    response.status(201).send("Wishlist item added");
});

app.delete('/deleteSingleItemById/:id', async (request, response) => {
    const tied_user = request.session?.tied_user;

    const id = request.params.id;
    await deleteSingleItemById(tied_user, id);
    response.status(200).send("Wishlist item deleted");
});

app.post('/registerNewUser', async (request, response) => {
    const user_username = request.body.user_username;
    const user_password = request.body.user_password;
    const user_displayname = request.body.user_displayname;

    try {
        await registerNewUser(user_username, user_password, user_displayname);
    } catch (e) {
        response.status(400).send((e as Error).message);
        return;
    };

    response.status(201).send("New user registered");

});

app.post('/userLogin', async (request, response) => {
    const user_username = request.body.user_username;
    const user_password = request.body.user_password;

    try {
        await userLogin(user_username, user_password); 
    } catch (e) {
        response.status(400).send((e as Error).message);
        return;
    }
    if(!request.session) {
        response.sendStatus(500);
        return;
    }

    request.session.tied_user = user_username;
    response.status(201).send("User logged in");

});