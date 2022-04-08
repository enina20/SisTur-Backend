
import { getConnection } from "../database/connection";

export const getPlaces = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Places');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            places: result.recordset
        }
    });
};

export const createPlace = async (req, res) => {
    const { name, email, password, role } = req.body;

    const slug = slugify(name, { lower: true});
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_User
        @User_Name_ = '${name}', 
        @User_Slug = '${slug}', 
        @User_Email = '${email}', 
        @User_Password = '${password}', 
        @Cod_Role = ${role}
        
    `); 
    console.log(name , email, password, role );
};

export const deletePlace = async (req, res) => {
    const cod = req.params.cod;        
    const pool = await getConnection();
    await pool.request().query(
        `EXEC Delete_Place
        @Cod_Place = '${cod}'`);     
    res.json({
        status: 200,
        message: "El lugar ha sido eliminado"
    });
};