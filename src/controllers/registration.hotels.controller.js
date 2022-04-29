import { getConnection } from "../database/connection";

export const getRegistrations = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`
        SELECT xR.Cod_Registration as Code, xR.Registration_Date as Date, 
        xR.Date_end as Date_End, xR.Cost as Cost, xH.Name as Hotel, xS.Name as Room, xU.User_Name_ as Client, xC.Client_Id, xC.Cell_Phone 
        FROM Registrations_Hotel xR, Rooms xS, Clients xC, Hotels xH, Users xU 
        WHERE xR.Cod_Room = xS.Cod_Room
        AND xR.Cod_Client = xC.Cod_Client
        AND xC.Cod_User = xU.Cod_User
        AND xR.Cod_Hotel = xH.Cod_Hotel
        `);    
        
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            registrations: result.recordset
        }
    });
};

export const getRegistrationHotels = async (req, res) => {
    const pool = await getConnection();
    const cod = req.params.cod;
    const result = await pool.request().query(`
        SELECT DISTINCT xR.Cod_Registration as Code, xR.Registration_Date as Date,
        xR.Date_end as Date_End, xR.Cost as Cost, xS.Name as Room, xU.User_Name_ as Client, xC.Client_Id, xC.Cell_Phone 
        FROM Registrations_Hotel xR, Rooms xS, Clients xC, Hotels xH, Users xU 
        WHERE xR.Cod_Hotel = '${cod}' 
        AND xR.Cod_Room = xS.Cod_Room
        AND xR.Cod_Client = xC.Cod_Client
        AND xC.Cod_User = xU.Cod_User
    `);  

    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            hotel: result.recordset
        }
    });
};

export const getRegistrationClients = async (req, res) => {
    
    const pool = await getConnection();
    const cod = req.params.cod; //cambio
    const result = await pool.request().query(`
        SELECT DISTINCT xR.Cod_Registration as Code, xR.Registration_Date as Date, 
        xR.Date_end as Date_End, xR.Cost as Cost, xH.Name as Hotel,xH.Image_Url,xH.Slug,  xS.Name as Room, xU.User_Name_ as Client, xC.Client_Id, xC.Cell_Phone 
        FROM Registrations_Hotel xR, Rooms xS, Clients xC, Hotels xH, Users xU 
        WHERE xR.Cod_Client = '${cod}' 
        AND xR.Cod_Client = xC.Cod_Client
        AND xR.Cod_Room = xS.Cod_Room        
        AND xC.Cod_User = xU.Cod_User
        AND xR.Cod_Hotel = xH.Cod_Hotel
        `);    
    res.status(200).json({
        status: 'success',
        hotel:true,
        results: result.recordset.length,
        data: {
            client: result.recordset
        }
    });
};

export const createRegistration = async (req, res) => {
    const { date, date_end, cost, cod_room, cod_client, client_id, cod_hotel } = req.body;
        
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_Registration_Hotel
        @Date = '${date}', 
        @Date_end = '${date_end}',
        @Cost = '${cost}',
        @Cod_Room = '${cod_room}', 
        @Cod_Client = '${cod_client}', 
        @Client_Id = '${client_id}', 
        @Cod_Hotel = '${cod_hotel}'
                
    `); 
    
    const result = await pool.request().query(`
        SELECT DISTINCT xR.Cod_Registration as Code, Registration_Date as Date, 
        xR.Date_end as Date_End, xR.Cost as Cost, xA.Name as Hotel, xT.Name as Package, xU.User_Name_ as Client, xC.Client_Id, xC.Cell_Phone 
        FROM Registrations_Hotel xR, Rooms xT, Clients xC, Hotels xA, Users xU 
        WHERE xR.Cod_Room = xT.Cod_Room
        AND xR.Cod_Client = '${cod_client}'
        AND xR.Cod_Client = xC.Cod_Client
        AND xC.Cod_User = xU.Cod_User
        AND xR.Cod_Hotel = xA.Cod_Hotel
    `);
    
    res.json({
        status: 200,
        hotel:true,
        message: "Registro realizado con éxito",
        data: {
            registration: result.recordset
        }
    });
};

export const updateRegistration = async (req, res) => {
    const {date, date_end, cost } = req.body;
    
    const cod = req.params.cod;
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Update_Registration_Hotel
        @Cod_Registration = '${cod}',
        @Date = '${date}',
        @Date_end = '${date_end}'
        @Cost = '${cost}',       
    `); 
    const result = await pool.request().query(`SELECT * FROM Registrations_Hotel WHERE Cod_Registration = '${cod}' `); 
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
        `EXEC Delete_Registration_Hotel
        @Cod_Registration = '${cod}'`);    

    res.json({
        status: 200,
        message: "El registro ha sido eliminado"
    });
};