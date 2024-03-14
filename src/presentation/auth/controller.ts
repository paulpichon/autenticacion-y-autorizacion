// Express
import { Request, Response } from "express";
// RegisterUserDto
import { CustomError, RegisterUserDto } from "../../domain";
// AuthService
import { AuthService } from "../services/auth.service";


export class AuthController {

    // Inyeccion de Dependencias
    constructor(
        public readonly authService: AuthService
    ) {}

    // manejo de errores
    private handleError = ( error: unknown, res: Response) => {
        // validar si el error es una instancia de nuestro CustomError
        if ( error instanceof CustomError) {
            // retornamos el error
            return res.status( error.statusCode ).json({ error: error.message });
        }
        // 
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal Server Error' });
        
    }

    // Metodos
    // Registro de usuarios
    registerUser = ( req: Request, res: Response ) => {
        // 
        const [error, registerDto] = RegisterUserDto.create(req.body);
        // validar si hay algun error
        if( error ) return res.status( 400 ).json({error});
        
        // 
        this.authService.registerUser(registerDto!)
            .then( (user) => res.json(user) )
            // manejo de errores
            .catch( error => this.handleError(error, res ) );
    }
    // Login de usuario
    loginUser = (req: Request, res: Response) => {
    
        res.json('loginuser');
          
      }
    
    
    
      validateEmail = (req: Request, res: Response) => {
    
        res.json('validateEmail');
      }

}