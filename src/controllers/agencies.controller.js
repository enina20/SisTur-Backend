
import { getConnection } from "../database/connection";

export const getAgencies = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Agencies');    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};

export const getAgenciesUyuni = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XA.*
                                                FROM Places XP, Agencies XA, Places_Agencies XPA
                                                WHERE XP.Name like 'Salar de Uyuni'
                                                AND XP.Cod_Place = XPA.Cod_Place
                                                AND XPA.Cod_Agency = XA.Cod_Agency`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};

export const getAgenciesCoroico = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XA.*
                                                FROM Places XP, Agencies XA, Places_Agencies XPA
                                                WHERE XP.Name like 'Coroico'
                                                AND XP.Cod_Place = XPA.Cod_Place
                                                AND XPA.Cod_Agency = XA.Cod_Agency`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};

export const getAgenciesSajama = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XA.*
                                            FROM Places XP, Agencies XA, Places_Agencies XPA
                                            WHERE XP.Name like 'Sajama'
                                            AND XP.Cod_Place = XPA.Cod_Place
                                            AND XPA.Cod_Agency = XA.Cod_Agency`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};

export const getAgenciesMadidi = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XA.*
                                                FROM Places XP, Agencies XA, Places_Agencies XPA
                                                WHERE XP.Name like 'Parque Nacional Madidi'
                                                AND XP.Cod_Place = XPA.Cod_Place
                                                AND XPA.Cod_Agency = XA.Cod_Agency`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};

export const getAgenciesTorotoro = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT XA.*
                                                FROM Places XP, Agencies XA, Places_Agencies XPA
                                                WHERE XP.Name like 'Toro toro'
                                                AND XP.Cod_Place = XPA.Cod_Place
                                                AND XPA.Cod_Agency = XA.Cod_Agency`);    
    res.status(200).json({
        status: 'success',
        results: result.recordset.length,
        data: {
            agencies: result.recordset
        }
    });
};

