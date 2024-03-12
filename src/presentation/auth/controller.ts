// Express
import { Request, Response } from "express";


export class AuthController {

    // Inyeccion de Dependencias
    constructor() {}

    // Metodos
    // Registro de usuarios
    registerUser( req: Request, res: Response ) {


        res.json('registerUser');

    }
    // Login de usuario
    loginUser( req: Request, res: Response ) {


        res.json('loginuser');

    }
    // Validar email: mediante un token
    validateEmail( req: Request, res: Response ) {


        res.json('validateemail');

    }

}