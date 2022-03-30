
import { getConnection } from "../database/connection";

export const getRegistrations = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Registrations');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            registrations: result.recordset
        }
    });
};

export const createRegistration = async (req, res) => {
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