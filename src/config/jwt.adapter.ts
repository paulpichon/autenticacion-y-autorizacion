// Generacion del JWT
// importar jsonwebtoken
import jwt  from "jsonwebtoken";
// JWT_SEED
import { envs } from "./envs";

// esto podria ser una dependencia oculta
// por eso se pone arriba para que pueda ser notorio
const JWT_SEED = envs.JWT_SEED;


export class JwtAdapter {

    // DI? si no necesitamos inyeccion de dependencias, entonces podemos trabajar con metodos estaticos

    // metodos
    // metodo para generar/crear el JWT
    static async generateToken(  payload: any, duration: string = '2h' ) {

        return new Promise( (resolve, reject) => {

            jwt.sign(payload, JWT_SEED, { expiresIn: duration}, (err, token) => {

                // si hay algun error devolvemos el resolñve pero con null
                if ( err ) return resolve( null );
                // si se resolvio de buena forma devolvemos el resolve token
                // se puede o no poner return ya que despues no hay nada mas que se ejecute
                //return resolve( token ); puede ser asi o como se pone abajo
                resolve( token );

            });

        });
                
    }   

    // metodo para validar el JWT
    static validateToken(token: string) {
        
        return new Promise( (resolve) => {

            jwt.verify( token, JWT_SEED, (err, decoded ) => {
                // si hay un error devolvemos el resolve con un null
                if ( err ) return resolve( null );
                // si no hay errores devolvemo el decoded
                resolve( decoded );
            });

        });

    }


}