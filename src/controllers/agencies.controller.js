import slugify from "slugify";
import { getConnection } from "../database/connection";

export const getAgencies = async (req, res) => {
    
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

export const getAgency = async (req, res) => {
    const pool = await getConnection();
    const slug = req.params.cod;
    const result = await pool.request().query(`SELECT * FROM Agencies WHERE Slug LIKE '${slug}' `);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agency: result.recordset
        }
    });
};

export const getAgenciesForPlace = async (req, res) => {
    
    const pool = await getConnection();
    const slug = req.params.cod;
    const result = await pool.request().query(`SELECT XA.*
                                                FROM Places XP, Agencies XA, Places_Agencies XPA
                                                WHERE XP.Slug like '${slug}'
                                                AND XP.Cod_Place = XPA.Cod_Place
                                                AND XPA.Cod_Agency = XA.Cod_Agency
                                                AND XA.Status = 1`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};


export const createAgency = async (req, res) => {
    const { name, description, location, manager, image_url, place } = req.body;
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
    const result = await pool.request().query(`
        SELECT * FROM Agencies WHERE Name = '${name}' `); 
    
    const agency = result.recordset[0].Cod_Agency;
        
    await pool.request().query(`
        EXEC Create_Places_Agencies
        @Cod_Place = '${place}', 
        @Cod_Agency = '${agency}'    
    `); 
    
    
    res.json({
        status: 200,
        message: "Agencia creada con éxito",
        data: {
            agency: result.recordset
        }
    });
    
};

export const updateAgency = async (req, res) => {
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

    const result = await pool.request().query(`SELECT * FROM Agencies WHERE Cod_Agency = '${cod}' `); 
    res.json({
        status: 200,
        message: "Agencia actualizada con éxito",
        data: {
            agencies: result.recordset
        }
    });
};

export const deleteAgency = async (req, res) => {

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
