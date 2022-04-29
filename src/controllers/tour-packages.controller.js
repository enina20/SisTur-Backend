import slugify from "slugify";
import { getConnection } from "../database/connection";

export const getTourPackages = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Tour_Packages Where Status = 1');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            packages: result.recordset
        }
    });
};

export const getTourPackageAgency = async (req, res) => {
    const pool = await getConnection();
    const codAgency = req.params.cod;
    const result = await pool.request().query(`SELECT * FROM Tour_Packages WHERE Cod_agency = '${codAgency}' and Status = 1`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            packages: result.recordset
        }
    });
};


export const createTourPackage = async (req, res) => {
    const { name, description, location, cost, cod_agency, date } = req.body;
    const slug = slugify(name, { lower: true});
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_Tour_Package
        @Name = '${name}', 
        @Slug = '${slug}', 
        @Cost = '${cost}',
        @Date = '${date}',
        @Description = '${description}', 
        @Location = '${location}',      
        @Cod_Agency = '${cod_agency}'
        
    `); 
    const result = await pool.request().query(`SELECT * FROM Tour_Packages WHERE Name = '${name}' `); 
    res.json({
        status: 200,
        message: "Hotel creado con éxito",
        data: {
            package: result.recordset
        }
    });
    
};

export const updateTourPackage = async (req, res) => {
    const { name, description, location, cost } = req.body;
    
    const cod = req.params.cod;
    
    const slug = slugify(name, { lower: true});
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Update_Tour_Package
        @Name = '${name}', 
        @Slug = '${slug}', 
        @Description = '${description}', 
        @Location = '${location}', 
        @Cost = '${cost}',
        @Cod_Tour_Package = '${cod}'       
    `); 
    const result = await pool.request().query(`SELECT * FROM Tour_Packages WHERE Cod_Tour_Package = '${cod}'`); 
    res.json({
        status: 200,
        message: "Información del paquete ha sido actualizada con éxito",
        data: {
            package: result.recordset
        }
    });
};


export const deleteTourPackage = async (req, res) => {

    const cod = req.params.cod;
        
    const pool = await getConnection();
    await pool.request().query(
        `EXEC Delete_Tour_Package
        @Cod_Tour_Package = '${cod}'`);     
    res.json({
        status: 200,
        message: "El paquete ha sido eliminado"
    });
};