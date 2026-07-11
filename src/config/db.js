import {Pool} from "pg";


const pool = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
const connectDB = async () => {

    try{
        const client=await pool.connect();
        console.log("Database connected successfully");
        client.release();
    }
    catch(err){
        console.error("Database connection failed", err);
        process.exit(1);
    }
}

export {connectDB, pool};