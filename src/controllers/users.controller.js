import slugify from "slugify";
import { getConnection } from "../database/connection";

export const getUsers = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('Select * from Users');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            users: result.recordset
        }
    });
};

export const createUser = async (req, res) => {
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