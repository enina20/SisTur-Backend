
import { getConnection } from "../database/connection";

export const getManagers = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Managers');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            managers: result.recordset
        }
    });
};

export const createManager = async (req, res) => {
    const { nit, id, cellphone, age, city, user } = req.body;
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_Manager
        @Manager_nit = '${nit}',
        @Manager_id = '${id}',
        @Manager_Cell_Phone = '${cellphone}', 
        @Manager_Age = '${age}', 
        @Manager_City = '${city}', 
        @Cod_User = ${user}
        
    `); 
    console.log(nit, id, cellphone, age, city, user );
    res.json({
        status: 200,
        message: "Usuario Administrador creado con éxito"
    });
};