
import { getConnection } from "../database/connection";

export const getManagers = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Managers');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            managers: result.recordset
        }
    });
};