import { getConnection } from "../database/connection";

export const getManagers = async (req, res) => {
    const pool = await getConnection(); //cambio
    const result = await pool.request().query(`
        SELECT xu.User_Name_, xu.User_Slug, xu.User_Email,
        xc.Manager_nit,xc.Manager_id, xc.Cell_Phone, xc.Age, xc.City, xc.Status 
        FROM Users xu, Managers xc
        WHERE xu.Cod_User = xc.Cod_User
        AND xu.User_Status = 1
        AND xc.Status = 1 `);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            managers: result.recordset
        }
    });
};


export const getRequestManagers = async (req, res) => {
    const pool = await getConnection(); //cambio
    const result = await pool.request().query(`SELECT xu.User_Name_, xu.User_Slug, xu.User_Email,
                                            xc.Cod_Manager,xc.Manager_id, xc.Cell_Phone, xc.Age, xc.City,xc.Status 
                                            FROM Users xu, Managers xc
                                            WHERE xu.Cod_User = xc.Cod_User
                                            AND xc.Status = 0`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            managers: result.recordset
        }
    });
};

export const getManager = async (req, res) => {
    const pool = await getConnection();
    const slug = req.params.cod;
    const result = await pool.request().query(`SELECT xu.User_Name_, xu.User_Slug, xu.User_Email,
                                              xc.Manager_nit,xc.Manager_id, xc.Cell_Phone, xc.Age, xc.City 
                                              FROM Users xu, Managers xc
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
    const manager = await pool.request().query(`SELECT * FROM Managers WHERE Manager_id  = '${id}' `);
    const user_manager = await pool.request().query(`
        SELECT xu.* FROM Managers xm, Users xu 
        WHERE xm.Manager_id  = '${id}' 
        AND xm.Cod_User = xu.Cod_User`); 
    res.json({
        status: 200,
        message: "Usuario Administrador creado con éxito",
        data: {
            manager: manager.recordset,
            user: user_manager.recordsets
        }
    });    
};

export const updateManager = async (req, res) => {
    const {nit, id, cellphone, age, city} = req.body;
    const cod = req.params.cod;
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Update_Manager
        @Cod_Manager = '${cod}',
        @Manager_nit = '${nit}', 
        @Manager_id = '${id}', 
        @Manager_Cell_Phone = '${cellphone}', 
        @Manager_Age = '${age}',
        @Manager_City = '${city}'       
    `); 
    const result = await pool.request().query(`SELECT * FROM Managers WHERE Cod_Manager = '${cod}' `); 
    res.json({
        status: 200,
        message: "Información actualizada con éxito",
        data: {
            hotel: result.recordset
        }
    });
};

export const deleteManager = async (req, res) => {
    const cod = req.params.cod;        
    const pool = await getConnection();
    await pool.request().query(
        `EXEC Delete_Manager
        @Cod_User = '${cod}'`);     
    res.json({
        status: 200,
        message: "El cliente ha sido eliminado"
    });
};

export const updateRequestManagers = async (req, res) => {
    const cod = req.params.cod;        
    const pool = await getConnection();
    await pool.request().query(
        `EXEC Update_Request_Manager
        @Cod_Manager = '${cod}'`);     
    res.json({
        status: 200,
        message: "El administrador ha sido habilitado con éxito"
    });
};