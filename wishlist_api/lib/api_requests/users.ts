import { pool } from '../index';

export async function registerNewUser (user_username:string, user_password:string, user_displayname:string) {
    const user_initial_bio = "This is your bio!";
    const user_default_pfp = "https://i.pinimg.com/736x/b6/a6/a5/b6a6a5e5a6759aecb9e16197ad13af75.jpg";

    // hashing

    const query = await pool.query('INSERT INTO users (user_username, user_password, user_displayname, user_profile_picture, user_bio) VALUES ($1, $2, $3, $4, $5)', [user_username, user_password, user_displayname, user_default_pfp, user_initial_bio]);

    return query.rows;
}

export async function userLogin (user_username:string, user_password:string) {
    const matchedUser = await pool.query('SELECT * FROM users WHERE user_username = $1', [user_username]);
    console.log(matchedUser.rows);
    if (!matchedUser.rows.length) {
        throw new Error("User not found");
    }

    if (matchedUser.rows[0].user_password !== user_password) {
        console.log("inserted password is:", user_password);
        console.log("password found is: ", matchedUser.rows[0].user_password)
        throw new Error("Incorrect password");
    }
};



export async function updateProfileInfo (user_username:string) {
    
}