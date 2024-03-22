// Rutas de category
// Routes express
import { Router } from 'express';
// Category controller
import { CategoryController } from './controller';
// AuthMiddleware
import { AuthMiddleware } from './auth.middleware';
// Category Service
import { CategoryService } from '../services/category.service';

//Clase para Category routes
export class CategoryRoutes {

		static get routes(): Router {

			const router = Router();
            // category service
            const categoryService = new CategoryService();
            // creamos la inctancias desde nuestro CategoryController
            const controller = new CategoryController(categoryService);

			// Definir las rutas
            // rutas para categorias
            // GET
			router.get('/', controller.getCategories );
            // POST
            // Middleware: el middleware AuthMiddleware.validateJWT: va a verificar que la ruta tenga el token            
            router.post('/', [ AuthMiddleware.validateJWT ], controller.createCategory );

			return router;
			
		}


}