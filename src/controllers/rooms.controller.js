import slugify from "slugify";
import { getConnection } from "../database/connection";

export const getRooms = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Rooms');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            rooms: result.recordset
        }
    });
};

export const getRoom = async (req, res) => {
    const pool = await getConnection();
    const cod_Hotel = req.params.cod;
    const result = await pool.request().query(`SELECT * FROM Rooms WHERE Cod_Hotel = '${cod_Hotel}' `);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            rooms: result.recordset
        }
    });
};

export const getRoomsForPlace = async (req, res) => {
    
    const pool = await getConnection();
    const slug = req.params.cod;
    const result = await pool.request().query(`SELECT XH.*
                                                FROM Places XP, Hotels XH, 
                                                Places_Hotels XPH, Rooms XR
                                                WHERE XP.Slug like '${slug}'
                                                AND XP.Cod_Place = XPH.Cod_Place
                                                AND XPH.Cod_Hotel = XH.Cod_Hotel
                                                AND XH.Cod_Hotel = XR.Cod_Hotel`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            rooms: result.recordset
        }
    });
};


export const createRoom = async (req, res) => {
    const { name, description, location, manager, image_url } = req.body;
    const slug = slugify(name, { lower: true});
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_Agency
        @Name = '${name}', 
        @Slug = '${slug}', 
        @Description = '${description}', 
        @Location = '${location}', 
        @Cod_Manager = '${manager}',
        @Image_Url = '${image_url}'
        
    `); 
    console.log(name, description, location, manager );
    res.json({
        status: 200,
        message: "Agencia creada con éxito"
    });
};

export const updateRoom = async (req, res) => {
    const {name, description, location, } = req.body;
    
    const cod = req.params.cod;
    
    const slug = slugify(name, { lower: true});
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Update_Agency
        @Cod_Agency = '${cod}',
        @Name = '${name}', 
        @Slug = '${slug}', 
        @Description = '${description}', 
        @Location = '${location}'        
    `); 
    // console.log(name, description, location );
    res.json({
        status: 200,
        message: "Agencia actualizada con éxito"
    });
};
