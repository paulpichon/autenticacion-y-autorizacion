// middlewares
// EXPRESS
import { NextFunction, request, response } from "express";
// JSONWEBTOKEN
import { JwtAdapter } from "../../config";
// User Model
import { UserModel } from "../../data";
// User Entity
import { UserEntity } from "../../domain";

export class AuthMiddleware {

    // metodos
    // req = request, res = response, next: NextFunction
    // tipado estricto
    static async validateJWT( req = request, res = response, next: NextFunction ) {

        // buscar el TOKEN: este viene del header del header
        const authorization = req.header('Authorization');
        // validar si viene authorization; si no viene mostramos una alaerta de error
        if ( !authorization ) return res.status( 401 ).json({ error: 'No token provided'});
        // verificar que el token empieze con la palabra Bearer seguida de un espacio
        if ( !authorization.startsWith('Bearer ')) return res.status( 401 ).json({ error: 'Invalid Bearer token'});

        // tomar el token
        // Se corta por el espacio y se pone la seguna posicion
        // si no viene algo ahi podemos poner '' comillas simple solo para asegurarnos que siempre vendra un string
        const token = authorization.split(' ').at( 1 ) || '';

        try {
            
            // verificar el JWT token 
            const payload = await JwtAdapter.validateToken<{ id: string }>( token );
            // verificar que venga el payload, en caso de que no sea valido o no venga mostramos el error
            if ( !payload ) return res.status( 401 ).json({ error: 'Invalid token'});
            // buscar el usuario mediante el ID del usuario
            const user = await UserModel.findById( payload.id );
            // Tambien podriamos validar si el USUARIO esta activo
            // Verificar que el usuario exista; en caso de que no mostramos un error
            if ( !user ) return res.status( 401 ).json({ error: 'Invalid token - usuario no existe'});

            //TODO: validar si el usuario essta activo

            // si tenemos un usuario
            req.body.user = UserEntity.fromObject( user );

            // llamamos la siguiente funcion
            next();

        } catch (error) {
            console.log( error );
            res.status( 500 ).json({ error: 'Internal Server Error' });            
        }

    }

}