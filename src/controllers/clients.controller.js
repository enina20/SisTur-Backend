
import { getConnection } from "../database/connection";

export const getClients = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT xu.User_Name_, xu.User_Slug, xu.User_Email,
                                            xc.Client_id, xc.Cell_Phone, xc.Age, xc.City 
                                            FROM Users xu, Clients xc
                                            WHERE xu.Cod_User = xc.Cod_User
                                            AND xu.User_Status = 1`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            clients: result.recordset
        }
    });
};

export const getClient = async (req, res) => {
    const pool = await getConnection();
    const slug = req.params.cod;
    const result = await pool.request().query(`SELECT xu.User_Name_, xu.User_Slug, xu.User_Email,
                                              xc.Client_id, xc.Cell_Phone, xc.Age, xc.City 
                                              FROM Users xu, Clients xc
                                              WHERE xu.User_Slug = '${slug}'
                                              AND xu.Cod_User = xc.Cod_User `);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            client: result.recordset
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
};

export const updateClient = async (req, res) => {
    const {id, cellphone, age, city} = req.body;
    
    const cod = req.params.cod;
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Update_Client
        @Cod_Client = '${cod}',
        @Client_Id = '${id}', 
        @Client_Cell_Phone = '${cellphone}', 
        @Client_Age = '${age}', 
        @Client_City = '${city}'        
    `); 
    const result = await pool.request().query(`SELECT * FROM Clients WHERE Cod_Client = '${cod}' `); 
    res.json({
        status: 200,
        message: "Información actualizada con éxito",
        data: {
            client: result.recordset
        }
    });
};

export const deleteClient = async (req, res) => {
    const cod = req.params.cod;        
    const pool = await getConnection();
    await pool.request().query(
        `EXEC Delete_Client
        @Cod_User = '${cod}'`);     
    res.json({
        status: 200,
        message: "El cliente ha sido eliminado"
    });
};