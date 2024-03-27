// file upload

// imporarcion del path
import path from 'path';
// file system
import fs from 'fs';
// express fileupload
import { UploadedFile } from "express-fileupload";

export class FileUploadService {

    constructor(){}

    // metodos
    // check del folder: verificar si existe el folder
    private checkFoler( folderPath: string ) {
        // verificar si existe en folderPath
        if ( !fs.existsSync( folderPath )) {
            // creamos el folder
            fs.mkdirSync( folderPath );
        }
        

    }    

    // carga unica de archivo
    async uploadSingle(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) {

        try {
            
            //extension del archivo .at() ---> posicion de un arreglo/objeto: 0,1,2,3,4,5,6,...
            // 'image/jpeg': image---> seria primer posicion o posicion 0
            // y jpeg seria segunda posicion o posion 1 
            const fileExtension = file.mimetype.split('/').at(1);
            // lugar donde lo vamos a colocar, para esto necesitamos importar 'path'
            const destination = path.resolve( __dirname, '../../../', folder );
            // validar si existe el folder
            this.checkFoler( destination );


            // mover el archivo
            file.mv( destination + `/mi-imagen.${ fileExtension }` );


        } catch (error) {
            console.log( error );
            
        }


        

    }

    // carga multiple
    uploadMultiple(
        file: any[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) {

    }

}