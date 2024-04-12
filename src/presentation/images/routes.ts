// Router express
import { Router } from "express";
// controlador de image
import { ImageController } from "./controller";


export class ImageRoutes {

    static get routes():Router {
        // 
        const router = Router();
        // creamos una instancias de ImageController
        const controller = new ImageController();
        // ruta
        router.get('/:type/:img', controller.getImage );




        return router;

    }

}