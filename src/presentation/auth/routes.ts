// Rutas de Autenticacion
// Router EXPRESS
import { Router } from 'express';
// Importamos clase de AuthController
import { AuthController } from './controller';
// Importamos la clase de AuthService
import { AuthService } from '../services/auth.service';

// Clase Authroutes: clase para nuestras rutas de autenticacion
export class Authroutes {

    static get routes(): Router {
        // Funcion Router de express
        const router = Router();
        // Creamos la instancia de AuthService
        const authService = new AuthService();
        // Creamos una instancia de AuthController
        const controller = new AuthController(authService);

        // Definir las rutas
        // Login de usuarios
        router.post('/login', controller.loginUser );
        // Registro de usuarios
        router.post('/register', controller.registerUser );
        // validacion de token por EMAIL: se recibe el TOKEN por URL
        router.get('/validate-email/:token', controller.validateEmail );


        return router;
    }
}

