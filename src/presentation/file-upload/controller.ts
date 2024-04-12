// Category controller

// custom error
import { Request, Response } from "express";
// Custom error
import { CustomError } from "../../domain";
import { FileUploadService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";


export class FileUploadController {
    // Inyeccion de dependencias
    constructor(
        private readonly fileUploadService: FileUploadService 
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

        // esto tambien se puede poner en un middleware
        // router.post('/single/:type', controller.uploadFile ); --->
        // el type viene de la ruta de arriba /single/type
        const type = req.params.type;
        // renombramos req.body.files
        const file = req.body.files.at(0) as UploadedFile;        
        // 
        this.fileUploadService.uploadSingle( file, `uploads/${ type }` )
            .then( uploaded => res.json( uploaded ))
            .catch( error => this.handleError( error, res ))
    }

    // subir archivos multiples
    uploadMultipleFile = ( req: Request, res: Response) => {
        
        // esto tambien se puede poner en un middleware
        // router.post('/single/:type', controller.uploadFile ); --->
        // el type viene de la ruta de arriba /single/type
        const type = req.params.type;
        // renombramos req.body.files
        const files = req.body.files as UploadedFile[];        
        // 
        this.fileUploadService.uploadMultiple( files, `uploads/${ type }` )
            .then( uploaded => res.json( uploaded ))
            .catch( error => this.handleError( error, res ))

    }

}