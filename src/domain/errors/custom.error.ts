// Errores personalizados

// Clase CustomError
export class CustomError extends Error {
    // constructor
    constructor(
        public readonly statusCode: number,
        public readonly message: string
    ) {
        // extends
        super( message );
    }

    // metodos
    // Errores personalizados
    // Bad request
    static badRequest( message: string ) {
        return new CustomError(400, message);
    }
    // Unauthorized
    static unauthorized( message: string ) {
        return new CustomError(401, message);
    }
    // Forbidden
    static forbidden( message: string ) {
        return new CustomError(403, message);
    }
    // not found
    static notFound( message: string ) {
        return new CustomError(404, message);
    }
    // internal server
    static internalServer( message: string ) {
        return new CustomError(500, message);
    }

}