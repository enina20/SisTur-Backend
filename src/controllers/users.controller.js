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
    const user = await pool.request().query(`SELECT *
                                              FROM Users
                                              WHERE User_Email LIKE '${email}'`); 
                
    if(user.recordset.length >= 1){
        res.json({
            status: 200,
            message: "El usuario ya esta registrado",
        });

    }else{
        await pool.request().query(`
        EXEC Create_User
        @User_Name_ = '${name}', 
        @User_Slug = '${slug}', 
        @User_Email = '${email}', 
        @User_Password = '${password}', 
        @Cod_Role = ${role}      
        `); 
        const result = await pool.request().query(`SELECT *
                                                FROM Users
                                                WHERE User_Slug = '${slug}'`); 
        
        res.json({
            status: 200,
            message: "Usuario creado con éxito",
            results: result.recordset.length,
            data: {
                user: result.recordset
            }
        });
    }    
};

export const updateUser = async (req, res) => {
    const {name, email, password, } = req.body;
    
    const cod = req.params.cod;
    
    const slug = slugify(name, { lower: true});
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Update_User
        @Cod_User = '${cod}',
        @User_Name_ = '${name}', 
        @User_Slug = '${slug}', 
        @User_Email = '${email}'
        @User_Password = '${password}'     
    `); 
    const result = await pool.request().query(`SELECT * FROM Users WHERE Cod_User = '${cod}' `); 
    res.json({
        status: 200,
        message: "Información actualizada con éxito",
        data: {
            user: result.recordset
        }
    });
};

export const deleteUser = async (req, res) => {
    const cod = req.params.cod;        
    const pool = await getConnection();
    await pool.request().query(
        `EXEC Delete_User
        @Cod_User = '${cod}'`);     
    res.json({
        status: 200,
        message: "El usuario ha sido eliminado"
    });
};