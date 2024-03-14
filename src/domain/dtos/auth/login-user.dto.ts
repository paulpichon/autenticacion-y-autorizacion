// DTOS
// Validar correo sea correcto
import { regularExps } from "../../../config";

export class LoginUserDto {

    // Sera un constructor privado, ya que solo se podra crear mediante nuestro metodo static create()
    private constructor(
        public email: string,
        public password: string
    ){}

    // metodos
    // Metodo create
    // Se recibe cualquier objeto literal
    // Se retorna un string: que e n este caso seria un error o una instancia de LoginUserDto
    static create( object: { [key: string]:any }): [string?, LoginUserDto?] {
        // desestructuramos del object
        const { email, password } = object;
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
        return [undefined, new LoginUserDto( email, password )];

    }

}