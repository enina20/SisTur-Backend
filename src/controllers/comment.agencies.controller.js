import { getConnection } from "../database/connection";

export const getComment = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`
        SELECT xc.Cod_Comment, xc.Comment_Date, xu.User_Name_, xa.Name, xc.Comment, xc.Rating
        FROM Comments_Agency xc, Agencies xa, Clients xl, Users xu
        WHERE xc.Cod_Agency = xa.Cod_Agency
        AND xc.Cod_Client = xl.Cod_Client
        AND xl.Cod_User = xu.Cod_User`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            comments: result.recordset
        }
    });
};

export const getCommentAgencies = async (req, res) => {
    const cod = req.params.cod;
    
    const pool = await getConnection();
    const result = await pool.request().query(`
        SELECT xc.Cod_Comment, xc.Comment_Date, xu.User_Name_, xa.Name, xc.Comment, xc.Rating
        FROM Comments_Agency xc, Agencies xa, Clients xl, Users xu
        WHERE xc.Cod_Agency = '${cod}'
        AND xc.Cod_Agency = xa.Cod_Agency
        AND xc.Cod_Client = xl.Cod_Client
        AND xl.Cod_User = xu.Cod_User`
    );    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            comment: result.recordset
        }
    });
};



export const createCommentAgency = async (req, res) => {
    const { date, comment, rating, client, id,  agency } = req.body;
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Create_Comments_Agency
        @Comment_Date = '${date}',
        @Comment = '${comment}',
        @Rating = '${rating}',
        @Cod_Client = '${client}',
        @Client_Id = '${id}',
        @Cod_Agency = '${agency}'          
    `); 
    const result = await pool.request().query(`
    SELECT xc.Cod_Comment, xc.Comment_Date, xu.User_Name_, xa.Name, xc.Comment, xc.Rating
    FROM Comments_Agency xc, Agencies xa, Clients xl, Users xu
    WHERE xc.Cod_Agency = '${agency}'
    AND xc.Cod_Agency = xa.Cod_Agency
    AND xc.Cod_Client = xl.Cod_Client
    AND xl.Cod_User = xu.Cod_User
    `); 
    res.json({
        status: 200,
        message: "Mensaje creado con éxito",
        data: {
            comment: result.recordset
        }
    });
};

export const updateCommentAgency = async (req, res) => {
    const {comment, rating } = req.body;
    
    const cod = req.params.cod;
    
    const pool = await getConnection();
    await pool.request().query(`
        EXEC Update_Comments_Agency
        @Cod_Comment = '${cod}',
        @Comment = '${comment}',
        @Rating = '${rating}'     
    `); 
  
    const result = await pool.request().query(`
        SELECT * FROM Comments_Agency WHERE Cod_Comment = '${cod}' `); 
    res.json({
        status: 200,
        message: "Información actualizada con éxito",
        data: {
            comment: result.recordset
        }
    });
};

export const deleteCommentAgency = async (req, res) => {

    const cod = req.params.cod;        
    const pool = await getConnection();

    await pool.request().query(
        `EXEC Delete_Comments_Agency
        @Cod_Comment = '${cod}'`); 

    res.json({
        status: 200,
        message: "El comentario ha sido eliminado"
    });
};