import slugify from "slugify";
import { getConnection } from "../database/connection";

export const getRooms = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Rooms WHERE Status = 1');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            rooms: result.recordset
        }
    });
};

export const getRoomsHotel = async (req, res) => {
    const pool = await getConnection();
    const codHotel = req.params.cod;
    const result = await pool.request().query(`SELECT * FROM Rooms WHERE Cod_Hotel = '${codHotel}' 
                                                AND Status = 1`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            rooms: result.recordset
        }
    });
};


export const createRoom = async (req, res) => {
    const { name, description, cost, cod_hotel } = req.body;
    const slug = slugify(name, { lower: true});
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_Room
        @Name = '${name}', 
        @Slug = '${slug}', 
        @Cost = '${cost}',
        @Description = '${description}',      
        @Cod_Hotel = '${cod_hotel}'
        
    `); 
    
    const result = await pool.request().query(`
    SELECT * FROM Rooms WHERE Cod_Hotel = '${cod_hotel}' `);
    
    res.json({
        status: 200,
        message: "Habitación creada con éxito",
        data: {
            rooms: result.recordset
        }
    });
};

export const updateRoom = async (req, res) => {
    const { name, description, cost } = req.body;
    
    const cod = req.params.cod;
    
    const slug = slugify(name, { lower: true});
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Update_Room
        @Name = '${name}', 
        @Slug = '${slug}', 
        @Description = '${description}', 
        @Cost = '${cost}',
        @Cod_Room = '${cod}'       
    `); 
    const result = await pool.request().query(`SELECT * FROM Rooms WHERE Cod_Room = '${cod}' `); 
    res.json({
        status: 200,
        message: "Información de la habitación ha sido actualizada con éxito",
        data: {
            room: result.recordset
        }
    });
};


export const deleteRoom = async (req, res) => {

    const cod = req.params.cod;
        
    const pool = await getConnection();
    await pool.request().query(
        `EXEC Delete_Room
        @Cod_Room = '${cod}'`);     
    res.json({
        status: 200,
        message: "La habitación ha sido eliminada"
    });
};
