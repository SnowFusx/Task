import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// Configuración de CORS
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin)) {
			// Se permite la solicitud
			callback(null, true);
		} else {
			// Se deniega la solicitud
			callback(new Error('No permitido por CORS'));
		}
	},
};

app.use(cors(corsOptions));

// Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Servidor funcionando en el puerto ${PORT}`);
});
