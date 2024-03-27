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

        const files = req.files;
        // validar si hay archivos seleccionados
        if ( !req.files || Object.keys( req.files ).length === 0  ) {
            // mostrar un error
            return res.status( 400 ).json({ error: 'No files were selected'});
        }

        // 
        const file = req.files.file as UploadedFile;

        this.fileUploadService.uploadSingle( file )
            .then( uploaded => res.json( uploaded ))
            .catch( error => this.handleError( error, res ))
    }
    // subir archivos multiples
    uploadMultipleFile = ( req: Request, res: Response) => {
        res.json('uploadMultipleFile');
    }

}