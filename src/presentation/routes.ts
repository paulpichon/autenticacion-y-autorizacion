// Rutas de nuestra aplicacion
// Routes express
import { Router } from 'express';
// Se importa la clase Authroutes
import { Authroutes } from './auth/routes';

//Clase App Routes
export class AppRoutes {

		static get routes(): Router {

			const router = Router();

			// Definir las rutas
            // rutas para autenticacion
			router.use('/api/auth', Authroutes.routes );

			return router;
			
		}


}

