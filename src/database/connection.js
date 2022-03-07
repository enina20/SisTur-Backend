import sql from 'mssql';

const dbSettings = {
    user: 'Edson Nina',
    password: '${EEdsoNN1551}',
    server: 'localhost',
    database: 'Sistravel',
    options: {
        encryt: true,
        trustServerCertificate: true,
    }
}

async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings);
        const result = await pool.request().query("SELECT * FROM Users");
        console.log(result);
        return pool;
        
    } catch (error) {
        console.log(error);
    }
    
}

getConnection();