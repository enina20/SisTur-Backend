import slugify from "slugify";
import { getConnection } from "../database/connection";

export const login = async (req, res) => {

    const { email, password} = req.body;
    
    const pool = await getConnection();

    const user = await pool.request().query(
        `SELECT * FROM Users
        WHERE User_Email like '${email}'
        and User_Password like '${password}'`);   

    if(user.recordset.length >=1){
        const cod_user = user.recordset[0].Cod_User;
        if(user.recordset[0].Cod_Role == 1){
            const client = await pool.request().query(
                `SELECT * FROM Clients
                WHERE Cod_User = '${cod_user}'`);
            if(user.recordset.length >=1){
                res.status(200).json({
                    status: 'success',
                    user : user.recordset,
                    client:client.recordset            
                });        
            }
        }else{
            if(user.recordset[0].Cod_Role == 2) {
                const manager = await pool.request().query(
                    `SELECT * FROM Managers
                    WHERE Cod_User = '${cod_user}'`); 
                
                const cod_manager = manager.recordset[0].Cod_Manager;   
        
                const hotels = await pool.request().query(
                    `SELECT * FROM Hotels
                    WHERE Cod_Manager = '${cod_manager}'
                    AND Status = 1`);
                
                const agencies = await pool.request().query(
                    `SELECT * FROM Agencies
                    WHERE Cod_Manager = '${cod_manager}'
                    AND Status = 1`);
        
                if(manager.recordset.length >=1){
                    res.status(200).json({
                        status:'success',
                        user:user.recordset,
                        manager:manager.recordset,
                        hotel:hotels.recordset, 
                        agency:agencies.recordset             
                    });        
                }
            } else{
                const clients = await pool.request().query(
                    `SELECT COUNT(*) AS total FROM Clients`); 

                const managers = await pool.request().query(
                    `SELECT COUNT(*) AS total FROM Managers`);                 
        
                const hotels = await pool.request().query(
                    `SELECT COUNT(*) AS total FROM Hotels`);
                
                const agencies = await pool.request().query(
                    `SELECT COUNT(*) AS total FROM Agencies`);  

                res.status(200).json({
                    status: 'success',
                    user : user.recordset,
                    clients :clients.recordset,
                    managers :managers.recordset,
                    hotels :hotels.recordset, 
                    agencies:agencies.recordset           
                }); 
            } 
        }         
    }else{
        res.status(200).json({
            status: 'error',
            message : 'El correo o contraseña esta incorrecto'        
        });
    }      
};