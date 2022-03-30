import slugify from "slugify";
import { getConnection } from "../database/connection";

export const getHotels = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Hotels');    
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
    const uri = req.params.cod;
    console.log(req.params.cod);
    const result = await pool.request().query(`SELECT * FROM Hotels WHERE Slug LIKE 'hostal-wilma'' `);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            hotel: result.recordset
        }
    });
};


export const getHotelsUyuni = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XH.*
                                                FROM Places XP, Hotels XH, Places_Hotels XPH
                                                WHERE XP.Name like 'Salar de Uyuni'
                                                AND XP.Cod_Place = XPH.Cod_Place
                                                AND XPH.Cod_Hotel = XH.Cod_Hotel`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            hotels: result.recordset
        }
    });
};

export const getHotelsCoroico = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XH.*
                                                FROM Places XP, Hotels XH, Places_Hotels XPH
                                                WHERE XP.Name like 'Coroico'
                                                AND XP.Cod_Place = XPH.Cod_Place
                                                AND XPH.Cod_Hotel = XH.Cod_Hotel`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            hotels: result.recordset
        }
    });
};


export const getHotelsSajama = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XH.*
                                                FROM Places XP, Hotels XH, Places_Hotels XPH
                                                WHERE XP.Name like 'Sajama'
                                                AND XP.Cod_Place = XPH.Cod_Place
                                                AND XPH.Cod_Hotel = XH.Cod_Hotel`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            hotels: result.recordset
        }
    });
};

export const getHotelsCopacabana = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XH.*
                                                FROM Places XP, Hotels XH, Places_Hotels XPH
                                                WHERE XP.Name like 'Copacabana'
                                                AND XP.Cod_Place = XPH.Cod_Place
                                                AND XPH.Cod_Hotel = XH.Cod_Hotel`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            hotels: result.recordset
        }
    });
};

export const getHotelsMadidi = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XH.*
                                            FROM Places XP, Hotels XH, Places_Hotels XPH
                                            WHERE XP.Name like 'Parque Nacional Madidi'
                                            AND XP.Cod_Place = XPH.Cod_Place
                                            AND XPH.Cod_Hotel = XH.Cod_Hotel`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            hotels: result.recordset
        }
    });
};

export const getHotelsTorotoro = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XH.*
                                                FROM Places XP, Hotels XH, Places_Hotels XPH
                                                WHERE XP.Name like 'Toro toro'
                                                AND XP.Cod_Place = XPH.Cod_Place
                                                AND XPH.Cod_Hotel = XH.Cod_Hotel`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            hotels: result.recordset
        }
    });
};


export const createHotel = async (req, res) => {
    const { name, description, location, manager, image_url } = req.body;
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
    console.log(name, description, location, manager );
    res.json({
        status: 200,
        message: "Hotel creado con éxito"
    });
};