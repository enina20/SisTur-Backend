import { getConnection } from "../database/connection";

export const getRegistrations = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM Registrations_Agency`);    
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
    const result = await pool.request().query(`SELECT * FROM Registrations_Agency WHERE Cod_Agency = '${cod}' `);    
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
    const { date, cod_tour, cod_client, client_id, cod_agency } = req.body;
        
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_Registrations_Agency
        @Date = '${date}', 
        @Cod_Tour_Package = '${cod_tour}', 
        @Cod_Client = '${cod_client}', 
        @Client_Id = '${client_id}', 
        @Cod_Agency = '${cod_agency}'
                
    `); 
    
    res.json({
        status: 200,
        message: "Registro a la agencia creada con éxito"
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
