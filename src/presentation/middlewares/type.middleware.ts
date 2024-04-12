// middleware para validar los tipos( de la URL: folder)
// Express
import { NextFunction, Request, Response, response } from 'express';



export class TypeMiddleware {

    static validTypes( validTypes: string[] ) {

        return (req: Request, res: Response, next: NextFunction ) => {
            // esto tambien se puede poner en un middleware
            // router.post('/single/:type', controller.uploadFile ); --->
            // el type viene de la ruta de arriba /single/type
            const type = req.url.split('/').at(2) ?? ''; //{ type: '/multiple/products' }
            // console.log( {type} ); //{ type: '/multiple/products' }
            
            // si no incluye alguno de estos tipos validTypes
            if( !validTypes.includes( type )) {
                // mostramos una alerta
                return res.status( 400 ).json({ error: `Invalid type: ${ type }, valid ones ${ validTypes }`})
            }

            // llamar la siguiente funcion
            next();

        }

    }

}