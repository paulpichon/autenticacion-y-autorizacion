// Category controller

// custom error
import { Request, Response } from "express";
import { CustomError } from "../../domain";


export class CategoryController {
    // Inyeccion de dependencias
    constructor(){}
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

    // crear category
    createCategory = async( req: Request, res: Response) => {
     
        res.json('Create category');
        
    }
    // crear category
    getCategories = async( req: Request, res: Response) => {
     
        res.json('Get Categories');
        
    }

}