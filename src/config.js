import {config} from 'dotenv';
config(); //Carga y lee todas las variables de entorno 

export default {
    port: process.env.PORT || 3000
}