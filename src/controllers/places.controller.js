
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