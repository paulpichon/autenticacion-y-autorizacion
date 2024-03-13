// User entity
// Importamos CustomError 
import { CustomError } from "../errors/custom.error";

export class UserEntity {

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string,
    ) {}


    // metodos
    static fromObject( object: {[key:string]:any}) {
        // desestructurar propiedades
        // Tambien ponemos _id porque es el que manda mongo desde la BD
        const { id, _id, name, email, emailValidated, password, role, img } = object;
        // Validacion de cada una de las propiedades
        // Validar que venga _id o id
        if ( !_id && !id) {
            // lanzamos un error en caso de que no venga
            throw CustomError.badRequest('Missing id');
        }
        // Validar name
        if (!name) throw CustomError.badRequest('Missing name');
        // Validar email
        if (!email) throw CustomError.badRequest('Missing email');
        // Validar emailValidated
        if ( emailValidated === undefined ) throw CustomError.badRequest('Missing emailValidated');
        // Validar passoword
        if (!password) throw CustomError.badRequest('Missing password');
        // Validar rol
        if (!role) throw CustomError.badRequest('Missing role');
        
        // En caso de pasar todas las validaciones
        return new UserEntity( _id || id, name, email, emailValidated, password, role, img);

    }


}