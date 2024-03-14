// DTOS
// Validar correo sea correcto
import { regularExps } from "../../../config";

export class RegisterUserDto {

    // Sera un constructor privado, ya que solo se podra crear mediante nuestro metodo static create()
    private constructor(
        public name: string,
        public email: string,
        public password: string
    ){}

    // metodos
    // Metodo create
    // Se recibe cualquier objeto literal
    // Se retorna un string: que e n este caso seria un error o una instancia de RegisterUserDto
    static create( object: { [key: string]:any }): [string?, RegisterUserDto?] {
        // desestructuramos del object
        const { name, email, password } = object;
        // validar el name
        // Si no viene el name, se enviara el mensaje de error como primer parametro y undefined como segundo parametro: pero es opcional mandarlo ya que puede o no mandarse
        if ( !name ) return ['Missing name'];
        // if ( !name ) return ['Missing name', undefined];
        // Validar el email
        if ( !email ) return ['Missing email'];
        // validar que sea un correo valido
        if ( !regularExps.email.test( email ) ) return ['Email is not valid'];

        // validar el password 
        if (!password ) return ['Missing password'];
        // validar el tamaño del password
        if ( password.length < 6 ) return ['Password too short']; 

        // si todo sale bien
        // Creamos una nieva instancia de RegisterUserDto()
        return [undefined, new RegisterUserDto( name, email, password )];

    }

}