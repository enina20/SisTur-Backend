import express from 'express';
import config from './config';

import agenciesRoutes from './routes/agencies.route'; 
import clientsRoutes from './routes/clients.route'; 
import managersRoutes from './routes/managers.route'; 
import registrationsRoutes from './routes/registrations.route'; 
import reservationsRoutes from './routes/reservations.route'; 
import usersRoutes from './routes/users.route'; 
import hotelsRoutes from './routes/hotels.route'; 
import placesRoutes from './routes/places.route'; 

const app = express();

//Setting 
app.set('port', config.port);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(agenciesRoutes, clientsRoutes, managersRoutes, placesRoutes,
    registrationsRoutes, reservationsRoutes, usersRoutes, hotelsRoutes);

export default app;