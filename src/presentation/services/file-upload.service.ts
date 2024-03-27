// file upload

export class FileUploadSerive {

    constructor(){}

    // metodos
    // check del folder: verificar si existe el folder
    private checkFoler( folderPath: string ) {
        throw new Error('Not Implemented');
    }    

    // carga unica de archivo
    uploadSingle(
        file: any,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) {

    }

    // carga multiple
    uploadMultiple(
        file: any[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) {

    }

}