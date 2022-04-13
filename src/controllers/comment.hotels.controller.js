import slugify from "slugify";
import { getConnection } from "../database/connection";

export const getCommentHotels = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM Agencies
                                               WHERE Status = 1`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};

export const createCommentHotel = async (req, res) => {
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

export const updateCommentHotel = async (req, res) => {
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

export const deleteCommentHotel = async (req, res) => {

    const cod = req.params.cod;
        
    const pool = await getConnection();
    await pool.request().query(
        `EXEC Delete_Agency
        @Cod_Agency = '${cod}'`);     
    res.json({
        status: 200,
        message: "La agencia ha sido eliminada"
    });
};
