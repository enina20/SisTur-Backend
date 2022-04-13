import slugify from "slugify";
import { getConnection } from "../database/connection";

export const getTourPackages = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Tour_Packages');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            packages: result.recordset
        }
    });
};

export const getTourPackage = async (req, res) => {
    const pool = await getConnection();
    const codAgency = req.params.cod;
    const result = await pool.request().query(`SELECT * FROM Tour_Packages WHERE Cod_agency = '${codAgency}' `);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            packages: result.recordset
        }
    });
};

export const getTourPackagesForPlace = async (req, res) => {
    
    const pool = await getConnection();
    const slug = req.params.cod;
    console.log('====>',slug);
    const result = await pool.request().query(`SELECT XT.*
                                                FROM Places XP, Agencies XA, 
                                                Places_Agencies XPA, Tour_Packages XT
                                                WHERE XP.Slug like '${slug}'
                                                AND XP.Cod_Place = XPA.Cod_Place
                                                AND XPA.Cod_Agency = XA.Cod_Agency
                                                AND XPA.Cod_Agency = XT.Cod_Agency`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            packages: result.recordset
        }
    });
};


export const createTourPackage = async (req, res) => {
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

export const updateTourPackage = async (req, res) => {
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
    const result = await pool.request().query(`SELECT * FROM Tour_Packages WHERE Cod_Tour_Package = '${cod}' `); 
    res.json({
        status: 200,
        message: "Información de la habitación ha sido actualizada con éxito",
        data: {
            package: result.recordset
        }
    });
};
