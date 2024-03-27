// Category controller

// custom error
import { Request, Response } from "express";
// Custom error
import { CustomError } from "../../domain";


export class FileUploadController {
    // Inyeccion de dependencias
    constructor(
        // private readonly categoryService: CategoryService
    ){}
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

    // subir archivo
    uploadFile = ( req: Request, res: Response) => {

        console.log({ files: req.files } );
        

        res.json('uploadFile');
    }
    // subir archivos multiples
    uploadMultipleFile = ( req: Request, res: Response) => {
        res.json('uploadMultipleFile');
    }

}