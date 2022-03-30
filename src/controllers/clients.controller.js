
import { getConnection } from "../database/connection";

export const getClients = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Clients');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            clients: result.recordset
        }
    });
};

export const createClient = async (req, res) => {
    const { id, cellphone, age, city, user } = req.body;
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_Client
        @Client_Id = '${id}', 
        @Client_Cell_Phone = '${cellphone}', 
        @Client_Age = '${age}', 
        @Client_City = '${city}', 
        @Cod_User = ${user}
        
    `); 
    console.log(id, cellphone, age, city, user);
    res.json({
        status: 200,
        message: "Usuario Cliente creado con éxito"
    });
};