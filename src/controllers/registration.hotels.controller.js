import { getConnection } from "../database/connection";

export const getRegistrations = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM Registrations_Hotel`);    
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
    const result = await pool.request().query(`SELECT * FROM Registrations_Hotel WHERE Cod_Hotel = '${cod}' `);    
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
    const cod = req.params.cod;
    const result = await pool.request().query(`SELECT * FROM Registrations_Agency WHERE Cod_Client = '${cod}' `);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            client: result.recordset
        }
    });
};

export const createRegistration = async (req, res) => {
    const { date, cod_room, cod_client, client_id, cod_hotel } = req.body;
        
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_Registration_Hotel
        @Date = '${date}', 
        @Cod_Room = '${cod_room}', 
        @Cod_Client = '${cod_client}', 
        @Client_Id = '${client_id}', 
        @Cod_Hotel = '${cod_hotel}'
                
    `); 
    
    res.json({
        status: 200,
        message: "Registro al hotel creado con éxito"
    });
};

export const updateRegistration = async (req, res) => {
    const {date } = req.body;
    
    const cod = req.params.cod;
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Update_Registration_Hotel
        @Cod_Registration = '${cod}',
        @Date = '${date}'        
    `); 
    const result = await pool.request().query(`SELECT * FROM Registrations_Agency WHERE Cod_Place = '${cod}' `); 
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
        `EXEC Delete_Agency
        @Cod_Registration = '${cod}'`);     
    res.json({
        status: 200,
        message: "El registro ha sido eliminado"
    });
};
