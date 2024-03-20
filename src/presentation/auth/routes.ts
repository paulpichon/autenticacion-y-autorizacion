// Rutas de Autenticacion
// Router EXPRESS
import { Router } from 'express';
// Importamos clase de AuthController
import { AuthController } from './controller';
// Importamos la clase de AuthService
// email service: envio de correo
import { AuthService, EmailService } from '../services';
import { envs } from '../../config';


// Clase Authroutes: clase para nuestras rutas de autenticacion
export class Authroutes {

    static get routes(): Router {
        // Funcion Router de express
        const router = Router();

        // creamos una instancia de email service
        // e inyectamos las variables de entorno que nos solicita
        const emailService = new EmailService(
            envs.MAILER_HOST,
            envs.MAILER_PORT,
            envs.MAILER_SECURE,
            envs.MAILER_AUTH_USER,
            envs.MAILER_AUTH_PASSWORD,
            // SOLO PARA ENVIAR EL CORREO DE FORMA FICTICIA
            // Se puede quitar cuando ya se este en produccion
            envs.SEND_EMAIL,
        );
        // Creamos la instancia de AuthService
        // Insetamos emailService a AuthService
        const authService = new AuthService(emailService);
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

