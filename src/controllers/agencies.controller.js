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
    const uri = req.params.cod;
    console.log(req.params.cod);
    const result = await pool.request().query(`SELECT * FROM Agencies WHERE Cod_Agency =  ${uri} `);    
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
