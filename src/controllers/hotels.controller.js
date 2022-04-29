import slugify from "slugify";
import { getConnection } from "../database/connection";

export const getHotels = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM Hotels
                                                WHERE Status = 1`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            hotels: result.recordset
        }
    });
};

export const getHotel = async (req, res) => {
    const pool = await getConnection();  
    const slug = req.params.cod;  
    const result = await pool.request().query(`SELECT * FROM Hotels WHERE Slug LIKE '${slug}'`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            hotel: result.recordset
        }
    });
};


export const getHotelsForPlace = async (req, res) => {
    const pool = await getConnection();
    const slug = req.params.cod;
    const result = await pool.request().query(`SELECT XH.*
                                                FROM Places XP, Hotels XH, Places_Hotels XPH
                                                WHERE XP.Slug like '${slug}'
                                                AND XP.Cod_Place = XPH.Cod_Place
                                                AND XPH.Cod_Hotel = XH.Cod_Hotel
                                                AND XH.Status = 1`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            hotels: result.recordset
        }
    });
};

export const createHotel = async (req, res) => {
    const { name, description, location, manager, image_url, place } = req.body;
    const slug = slugify(name, { lower: true});
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_Hotel
        @Name = '${name}', 
        @Slug = '${slug}', 
        @Description = '${description}', 
        @Location = '${location}', 
        @Cod_Manager = '${manager}',
        @Image_Url = '${image_url}'
        
    `); 
   
    const result = await pool.request().query(`SELECT * FROM Hotels WHERE Name = '${name}' `); 
    
    const hotel = result.recordset[0].Cod_Hotel;
    
    await pool.request().query(`
        EXEC Create_Places_Agencies
        @Cod_Place = '${place}', 
        @Cod_Hotel = '${hotel}'    
    `); 

    res.json({
        status: 200,
        message: "Hotel creado con éxito",
        data: {
            hotel: result.recordset
        }
    });
};

export const updateHotel = async (req, res) => {
    const {name, description, location} = req.body;
    const slug = slugify(name, { lower: true});
    const cod = req.params.cod;
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Update_Hotel
        @Cod_Hotel = '${cod}',
        @Name = '${name}', 
        @Slug = '${slug}', 
        @Description = '${description}', 
        @Location = '${location}'        
    `); 

    const result = await pool.request().query(`SELECT * FROM Hotels WHERE Cod_Hotel = '${cod}' `); 
    res.json({
        status: 200,
        message: "Información del hotel actualizada con éxito",
        data: {
            hotel: result.recordset
        }
    });
};

export const deleteHotel = async (req, res) => {
    const cod = req.params.cod;        
    const pool = await getConnection();
    await pool.request().query(
        `EXEC Delete_Hotel
        @Cod_Hotel = '${cod}'`);     
    res.json({
        status: 200,
        message: "El hotel ha sido eliminado"
    });
};