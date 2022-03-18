import sql from 'mssql';
import {config} from 'dotenv'
config();

const dbSettings = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        encryt: true,
        trustServerCertificate: true,
    }
}

export async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings);
        return pool;        
    } catch (error) {
        console.log(error);
    }    
}

// getConnection();