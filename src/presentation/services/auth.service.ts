// Aqui es donse realizara el proceso para registrar un nuevo usuario
// Aqui es donde se guardara en la BD

// Modelo de MongoDB
import { UserModel } from "../../data";
// RegisterUserDto
// CustomError
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
// encriptar password
// crear JWT
import { JwtAdapter, bcryptAdapter, envs } from "../../config";
// Email Service
import { EmailService } from "./email.service";

export class AuthService {
    // DI
    constructor(
        // Inyeccion de dependencias: Email Service
        private readonly emailService: EmailService
    ){}

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
            // Email de confirmacion
            await this.sendEmailValidationLink( user.email )
            // desestruturamos password para que no nos aparezca en la respuesta
            // y aqui tambien quitamos __v, mediante nuestro UserEntity.fromObject()
            const { password, ...userEntity } = UserEntity.fromObject( user );

            // JWT ----> Para mantener la autenticacion del usuario
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

    // Metodo para validar el link de validacion de token
    private sendEmailValidationLink = async( email: string ) => {
        // generar token
        const token = await JwtAdapter.generateToken({ email });
        // En caso de no poder generarse el TOKEN
        if ( !token ) throw CustomError.internalServer('Error getting token');
        // generacion del link con el TOKEN
        const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`;
        // crear el HTML del correo
        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${ link }">Validate your email: ${ email }</a>
        `;

        // crear options del correo
        const options = {
            to:email,
            subject: 'Validate your email',
            htmlBody: html
        }
        // llamamos el metodo sendEmail de emailService y le mandamos los options
        const isSent = await this.emailService.sendEmail(options);
        // si no se envia el correo
        if ( !isSent ) throw CustomError.internalServer('Error sending email');
        // si todo salio bien retornamos un true
        return true;
    }

    // validar email
    public validateEmail = async( token: string ) => {
        // payload
        const payload = await JwtAdapter.validateToken( token );
        // si no hay payload, mostramos un mensaje de error
        if (!payload) throw CustomError.unauthorized('Invalid token');

        // email: podemos decirle que tome el email como un objeto de tipo string
        const { email } = payload as { email: string };
        // si no existe, es porque ocurrio un error de nuestra parte
        if (!email) throw CustomError.internalServer('Email not in token');

        // usuario de la BD
        const user = await UserModel.findOne({ email });
        // si no existe el user
        if (!user) throw CustomError.internalServer('Email not exists');

        // actualizamos la BD
        // en este caso actualizamos emailValidated de la BD de false a true
        user.emailValidated = true;
        // y guardamos en la BD
        await user.save();

        return true;


    } 
}