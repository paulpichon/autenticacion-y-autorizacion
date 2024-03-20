// Rutas de category
// Routes express
import { Router } from 'express';
// Category controller
import { CategoryController } from './controller';

//Clase para Category routes
export class CategoryRoutes {

		static get routes(): Router {

			const router = Router();
            // creamos la inctancias desde nuestro CategoryController
            const controller = new CategoryController();

			// Definir las rutas
            // rutas para autenticacion
            // GET
			router.get('/', controller.getCategories );
            // POST
            router.post('/', controller.createCategory );

			return router;
			
		}


}