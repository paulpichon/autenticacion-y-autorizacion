// Rutas de nuestra aplicacion
// Routes express
import { Router } from 'express';
// Se importa la clase Authroutes
import { Authroutes } from './auth/routes';
// Categories routes
import { CategoryRoutes } from './category/routes';

//Clase App Routes
export class AppRoutes {

		static get routes(): Router {

			const router = Router();

			// Definir las rutas
            // rutas para autenticacion
			router.use('/api/auth', Authroutes.routes );
			// Asignar ruta Categories a un path
			router.use('/api/categories', CategoryRoutes.routes );

			return router;
			
		}


}

