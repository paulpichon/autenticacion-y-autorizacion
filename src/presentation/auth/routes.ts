// Rutas de Autenticacion
// Router EXPRESS
import { Router } from 'express';
// Importamos clase de AuthController
import { AuthController } from './controller';

// Clase Authroutes: clase para nuestras rutas de autenticacion
export class Authroutes {

    static get routes(): Router {
        // Funcion Router de express
        const router = Router();
        // Creamos una instancia de AuthController
        const controller = new AuthController();

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

