// middleware para subir archivos
// Express
import { NextFunction, Request, Response } from 'express';



export class FileUploadMiddleware {

    static containFiles( req: Request, res: Response, next: NextFunction ) {
     
        // validar si hay archivos seleccionados
        if ( !req.files || Object.keys( req.files ).length === 0  ) {
            // mostrar un error
            return res.status( 400 ).json({ error: 'No files were selected'});
        }
        // validar si es un arreglo
        // eq.files.file = archivo:imagen
        if ( !Array.isArray( req.files.file ) ) {
            // si esto no es un arreglo, significa que es el objeto de la imagen
            req.body.files = [ req.files.file ];
        } else {
            req.body.files = req.files.file;
        }

        // pasamos al siguiente middleware
        next();
        
    }

}