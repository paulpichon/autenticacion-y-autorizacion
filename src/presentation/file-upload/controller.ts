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

        // router.post('/single/:type', controller.uploadFile ); --->
        // el type viene de la ruta de arriba /single/type
        const type = req.params.type;
        // tipos validos, esto se puede configurar
        const validTypes = ['users', 'products', 'categories'];
        // si no incluye alguno de estos tipos validTypes
        if( !validTypes.includes( type )) {
            // mostramos una alerta
            return res.status( 400 ).json({ error: `Invalid type: ${ type }, valid ones ${ validTypes }`})
        }

        // validar si hay archivos seleccionados
        if ( !req.files || Object.keys( req.files ).length === 0  ) {
            // mostrar un error
            return res.status( 400 ).json({ error: 'No files were selected'});
        }

        // renombramo req.files.files
        const file = req.files.file as UploadedFile;
        // 
        this.fileUploadService.uploadSingle( file, `uploads/${ type }` )
            .then( uploaded => res.json( uploaded ))
            .catch( error => this.handleError( error, res ))
    }
    // subir archivos multiples
    uploadMultipleFile = ( req: Request, res: Response) => {
        res.json('uploadMultipleFile');
    }

}