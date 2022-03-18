
import { getConnection } from "../database/connection";

export const getClients = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Clients');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            clients: result.recordset
        }
    });
};