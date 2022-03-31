import slugify from "slugify";
import { getConnection } from "../database/connection";

export const getAgencies = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Agencies');    
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

export const getAgenciesUyuni = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XA.*
                                                FROM Places XP, Agencies XA, Places_Agencies XPA
                                                WHERE XP.Name like 'Salar de Uyuni'
                                                AND XP.Cod_Place = XPA.Cod_Place
                                                AND XPA.Cod_Agency = XA.Cod_Agency`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};

export const getAgenciesCoroico = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XA.*
                                                FROM Places XP, Agencies XA, Places_Agencies XPA
                                                WHERE XP.Name like 'Coroico'
                                                AND XP.Cod_Place = XPA.Cod_Place
                                                AND XPA.Cod_Agency = XA.Cod_Agency`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};

export const getAgenciesSajama = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XA.*
                                            FROM Places XP, Agencies XA, Places_Agencies XPA
                                            WHERE XP.Name like 'Sajama'
                                            AND XP.Cod_Place = XPA.Cod_Place
                                            AND XPA.Cod_Agency = XA.Cod_Agency`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};

export const getAgenciesMadidi = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XA.*
                                                FROM Places XP, Agencies XA, Places_Agencies XPA
                                                WHERE XP.Name like 'Parque Nacional Madidi'
                                                AND XP.Cod_Place = XPA.Cod_Place
                                                AND XPA.Cod_Agency = XA.Cod_Agency`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};

export const getAgenciesTorotoro = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XA.*
                                                FROM Places XP, Agencies XA, Places_Agencies XPA
                                                WHERE XP.Name like 'Toro toro'
                                                AND XP.Cod_Place = XPA.Cod_Place
                                                AND XPA.Cod_Agency = XA.Cod_Agency`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};

export const createAgency = async (req, res) => {
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
    // console.log(name, description, location );
    res.json({
        status: 200,
        message: "Agencia actualizada con éxito"
    });
};
