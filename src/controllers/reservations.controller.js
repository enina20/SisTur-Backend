
import { getConnection } from "../database/connection";

export const getReservations = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Reservations');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            reservations: result.recordset
        }
    });
};