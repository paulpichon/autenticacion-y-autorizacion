// Rutas de fileUpload
// Routes express
import { Router } from 'express';
// File Uploads
import { FileUploadController } from './controller';
// FileUploadService
import { FileUploadService } from '../services/file-upload.service';

//Clase para FileUpload Routes
export class FileUploadRoutes {

    static get routes(): Router {

        const router = Router();
        // creamos la instancia desde nuestro FileUploadController
        const controller = new FileUploadController(
            new FileUploadService()
        );

        // Definir las rutas
        // rutas para subir archivos
        // api/upload/single/<user|category|product>/
        // api/upload/multiple/<user|category|product>/
        router.post('/single/:type', controller.uploadFile );
        // POST 
        router.post('/multiple/:type',  controller.uploadMultipleFile );

        return router;			
    }
}