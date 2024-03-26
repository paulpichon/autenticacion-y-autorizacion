// Rutas de category
// Routes express
import { Router } from 'express';
// AuthMiddleware
import { AuthMiddleware } from '../middlewares/auth.middleware';
// Prodcut Service
import { ProductService } from '../services/product.service';
// ProductController
import { ProductController } from './controller';


//Clase para Category routes
export class ProductRoutes {

		static get routes(): Router {

			const router = Router();
            // product service
            const productService = new ProductService();
            // controller
            const controller = new ProductController( productService );
          

			// Definir las rutas
            // rutas para categorias
            // GET
			router.get('/', controller.getProducts );
            // POST
            // Middleware: el middleware AuthMiddleware.validateJWT: va a verificar que la ruta tenga el token            
            router.post('/', [ AuthMiddleware.validateJWT ], controller.createProduct );

			return router;
			
		}


}