import { getConnection } from "../database/connection";

export const getRegistrations = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`
        SELECT Registration_Date as Date,xR.Cod_Registration as Code, xA.Name as Agency, xT.Name as Package, xU.User_Name_ as Client, xC.Client_Id, xC.Cell_Phone 
        FROM Registrations_Agency xR, Tour_Packages xT, Clients xC, Agencies xA, Users xU 
        WHERE xR.Cod_Tour_Package = xT.Cod_Tour_Package
        AND xR.Cod_Client = xC.Cod_Client
        AND xC.Cod_User = xU.Cod_User
        AND xR.Cod_Agency = xA.Cod_Agency
        `);    
        
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            registrations: result.recordset
        }
    });
};

export const getRegistrationAgencies = async (req, res) => {
    const pool = await getConnection();
    const cod = req.params.cod;
    const result = await pool.request().query(`
        SELECT DISTINCT Registration_Date as Date,xR.Cod_Registration as Code, xT.Name as Package, xU.User_Name_ as Client, xC.Client_Id, xC.Cell_Phone 
        FROM Registrations_Agency xR, Tour_Packages xT, Clients xC, Agencies xA, Users xU 
        WHERE xR.Cod_Agency = '${cod}'
        AND xR.Cod_Tour_Package = xT.Cod_Tour_Package
        AND xR.Cod_Client = xC.Cod_Client
        AND xC.Cod_User = xU.Cod_User
    `);  

    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agency: result.recordset
        }
    });
};

export const getRegistrationClients = async (req, res) => {
    
    const pool = await getConnection();
    const cod = req.params.cod; //cambio
    const result = await pool.request().query(`
        SELECT DISTINCT Registration_Date as Date,xR.Cod_Registration as Code,xR.Cost, xA.Name as Agency,xA.Image_Url,xA.Slug, xT.Name as Package, xU.User_Name_ as Client, xC.Client_Id, xC.Cell_Phone 
        FROM Registrations_Agency xR, Tour_Packages xT, Clients xC, Agencies xA, Users xU 
        WHERE xR.Cod_Tour_Package = xT.Cod_Tour_Package
        AND xR.Cod_Client = '${cod}'
        AND xR.Cod_Client = xC.Cod_Client
        AND xC.Cod_User = xU.Cod_User
        AND xR.Cod_Agency = xA.Cod_Agency
        `);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            client: result.recordset
        }
    });
};

export const createRegistration = async (req, res) => {
    const { date, cost, cod_tour, cod_client, client_id, cod_agency } = req.body;
        
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_Registration_Agency
        @Date = '${date}', 
        @Date_end = '${date}',
        @Cost = '${cost}',
        @Cod_Tour_Package = '${cod_tour}', 
        @Cod_Client = '${cod_client}', 
        @Client_Id = '${client_id}', 
        @Cod_Agency = '${cod_agency}'                
    `); 
    
    const result = await pool.request().query(`
        SELECT DISTINCT Registration_Date as Date,xR.Cod_Registration as Code, xA.Name as Agency, xT.Name as Package, xU.User_Name_ as Client, xC.Client_Id, xC.Cell_Phone 
        FROM Registrations_Agency xR, Tour_Packages xT, Clients xC, Agencies xA, Users xU 
        WHERE xR.Cod_Tour_Package = xT.Cod_Tour_Package
        AND xR.Cod_Client = '${cod_client}'
        AND xR.Cod_Client = xC.Cod_Client
        AND xC.Cod_User = xU.Cod_User
        AND xR.Cod_Agency = xA.Cod_Agency
    `);
    
    res.json({
        status: 200,
        message: "Registro realizado con éxito",
        data: {
            registration: result.recordset
        }
    });
};

export const updateRegistration = async (req, res) => {
    const {date } = req.body;
    
    const cod = req.params.cod;
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Update_Registration_Agency
        @Cod_Registration = '${cod}',
        @Date = '${date}'        
    `); 
    const result = await pool.request().query(`SELECT * FROM Registrations_Agency WHERE Cod_Registration = '${cod}' `); 
    res.json({
        status: 200,
        message: "El registro ha sido actualizado con éxito",
        data: {
            registration: result.recordset
        }
    });
};

export const deleteRegistration = async (req, res) => {

    const cod = req.params.cod;
        
    const pool = await getConnection();
    await pool.request().query(
        `EXEC Delete_Registration_Agency
        @Cod_Registration = '${cod}'`);    

    res.json({
        status: 200,
        message: "El registro ha sido eliminado"
    });
};