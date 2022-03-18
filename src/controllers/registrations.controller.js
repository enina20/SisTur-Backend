
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