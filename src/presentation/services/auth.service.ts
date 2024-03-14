// Aqui es donse realizara el proceso para registrar un nuevo usuario
// Aqui es donde se guardara en la BD

// Modelo de MongoDB
import { UserModel } from "../../data";
// RegisterUserDto
// CustomError
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";


export class AuthService {
    // DI
    constructor(){}

    // metodos 
    public async registerUser( registerUserDto: RegisterUserDto) {
        // Buscar si ya existe el correo en la BD
        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        // si existUser es true; mostramos un error
        if ( existUser ) throw CustomError.badRequest('Email already exist');
        
        try {
            // creacion del usuario
            // mandamos el registerDto que tiene la informacion del nuevo usuario
            const user = new UserModel(registerUserDto)
            // guardar en la BD
            await user.save();

            // encriptar la contraseña

            // JWT ----> Para mantener la autenticacion del usuario

            // Email de confirmacion

            // desestruturamos password para que no nos aparezca en la respuesta
            // y aqui tambien quitamos __v, mediante nuestro UserEntity.fromObject()
            const { password, ...userEntity } = UserEntity.fromObject( user );

            // regresamos el usuario
            return { 
                user: userEntity,
                token: 'ABC123'
            };

        } catch (error) {
            // si algo sale mal, mostramos el error
            throw CustomError.internalServer(`${ error }`);
        }
    }
}