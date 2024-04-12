// file upload

// imporarcion del path
import path from 'path';
// file system
import fs from 'fs';
// express fileupload
import { UploadedFile } from "express-fileupload";
// UUID
import { Uuid } from '../../config';
// Custom Error
import { CustomError } from '../../domain';

export class FileUploadService {

    constructor(
        // uuid
        private readonly uuid = Uuid.v4,
    ){}

    // metodos
    // check del folder: verificar si existe el folder
    private checkFolder( folderPath: string ) {
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
            // para que no sea undefined ponemos esto ---> ?? ''
            const fileExtension = file.mimetype.split('/').at(1) ?? '';
            // validar la extencion del archivo
            if ( !validExtensions.includes( fileExtension )) {
                // si no es correcta la extencion mostramos una alerta
                throw CustomError.badRequest(`Invalid extension: ${ fileExtension }, valid ones ${ validExtensions }`);
            }


            // lugar donde lo vamos a colocar, para esto necesitamos importar 'path'
            const destination = path.resolve( __dirname, '../../../', folder );
            // validar si existe el folder
            this.checkFolder( destination );

            const fileName = `${ this.uuid() }.${ fileExtension }`;


            // mover el archivo
            file.mv(`${destination}/${ fileName }`);

            return {fileName};


        } catch (error) {
            // console.log( error );
            throw error;
        }
    }

    // carga multiple
    async uploadMultiple(
        files: UploadedFile[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) {
        
        // llamamos a uploadSingle por cada archivo que se suba
        const fileNames = await Promise.all(
            files.map( file => this.uploadSingle( file, folder, validExtensions ))
        );

        // regresamos el filename
        return fileNames;
    }

}