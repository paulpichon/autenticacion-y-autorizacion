// FS
import fs from 'fs';
// path
import path from 'path';
// express
import { Request, Response } from "express";


export class ImageController {
    // ID
    constructor( ){}

    // metodos
    getImage(req: Request, res: Response) {
        // 
        const { type = '', img = '' } = req.params;
        // path de la imagen
        const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${img}`);
        console.log( imagePath );
        // verificar si existe la ruta de la imagen
        if ( !fs.existsSync( imagePath )){
            return res.status( 404 ).send('Image Not Found');
        }

        // si existe la IMAGE
        res.sendFile( imagePath ); 
        
    }

}