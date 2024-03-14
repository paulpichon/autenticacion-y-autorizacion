// Aqui es donse realizara el proceso para registrar un nuevo usuario
// Aqui es donde se guardara en la BD

// Modelo de MongoDB
import { UserModel } from "../../data";
// RegisterUserDto
// CustomError
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
// encriptar password
// crear JWT
import { JwtAdapter, bcryptAdapter } from "../../config";

export class AuthService {
    // DI
    constructor(){}

    // metodos 
    // Metodo para registrar usuarios
    public async registerUser( registerUserDto: RegisterUserDto) {
        // Buscar si ya existe el correo en la BD
        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        // si existUser es true; mostramos un error
        if ( existUser ) throw CustomError.badRequest('Email already exist');
        
        try {
            // creacion del usuario
            // mandamos el registerDto que tiene la informacion del nuevo usuario
            const user = new UserModel(registerUserDto)
            

            // encriptar la contraseña
            user.password = bcryptAdapter.hash( registerUserDto.password );
            // guardar en la BD
            await user.save();

            // JWT ----> Para mantener la autenticacion del usuario

            // Email de confirmacion

            // desestruturamos password para que no nos aparezca en la respuesta
            // y aqui tambien quitamos __v, mediante nuestro UserEntity.fromObject()
            const { password, ...userEntity } = UserEntity.fromObject( user );

            // creacion del JWT
            const token = await JwtAdapter.generateToken({ id: user.id });
            // si no se genera el token
            if (!token ) throw CustomError.internalServer('Error while creating JWT');

            // regresamos el usuario
            return { 
                user: userEntity,
                token: token
            };

        } catch (error) {
            // si algo sale mal, mostramos el error
            throw CustomError.internalServer(`${ error }`);
        }
    }

    // Metodo para login de usuarios
    public async loginUser( loginUserDto: LoginUserDto) {

        // findone para verificar si existe
        const user = await UserModel.findOne({ email: loginUserDto.email });
        // verificar si existe el user
        // Se podria poner un mensaje mas generico para no dar tantos detalles al usuario sobre ucal fue el error
        if (!user) throw CustomError.badRequest('Email not exist');
        // validar si la contraseña mandada hace match con la de la BD
        const isMatching = bcryptAdapter.compare( loginUserDto.password, user.password );
        //si no hay match 
        if (!isMatching) throw CustomError.badRequest('Password is not valid');
        // desestructuramos las propiedades de UserEntity.fromObject( user )
        const { password, ...userEntity } = UserEntity.fromObject( user );

        // creacion del JWT
        const token = await JwtAdapter.generateToken({ id: user.id });
        // si no se genera el token
        if (!token ) throw CustomError.internalServer('Error while creating JWT');

        // retornar el user y el token
        return {
            user: userEntity,
            token: token
        }

    }
}