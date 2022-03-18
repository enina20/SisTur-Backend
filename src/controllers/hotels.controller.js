
import { getConnection } from "../database/connection";

export const getHotels = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Hotels');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};