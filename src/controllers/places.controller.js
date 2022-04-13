
import { getConnection } from "../database/connection";

export const getPlaces = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Places WHERE User_Status = 1');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            places: result.recordset
        }
    });
};

export const createPlace = async (req, res) => {
    const { name, description, location, image_url, super_user } = req.body;
    const slug = slugify(name, { lower: true});
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_Place
        @Name = '${name}', 
        @Slug = '${slug}', 
        @Description = '${description}', 
        @Location = '${location}',         
        @Image_Url = '${image_url}',
        @Cod_Super_User = '${super_user}',
        
    `); 
    
    res.json({
        status: 200,
        message: "Hotel creado con éxito"
    });
};

export const updatePlace = async (req, res) => {
    const {name, description, location} = req.body;
    const slug = slugify(name, { lower: true});
    const cod = req.params.cod;
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Update_Places
        @Cod_Place = '${cod}',
        @Name = '${name}', 
        @Slug = '${slug}', 
        @Description = '${description}', 
        @Location = '${location}'        
    `); 

    const result = await pool.request().query(`SELECT * FROM Places WHERE Cod_Place = '${cod}' `); 
    res.json({
        status: 200,
        message: "Información del lugar ha sido actualizada con éxito",
        data: {
            place: result.recordset
        }
    });
};

export const deletePlace = async (req, res) => {
    const cod = req.params.cod;        
    const pool = await getConnection();
    await pool.request().query(
        `EXEC Delete_Place
        @Cod_PLace = '${cod}'`);     
    res.json({
        status: 200,
        message: "El lugar ha sido eliminado"
    });
};