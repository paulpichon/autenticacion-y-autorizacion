// Mongoose
import mongoose from "mongoose";


export class Validators {

    // metodos
    // Validar el ID mongo
    static isMongoID( id: string ) {
        // validamos el ID de mongo
        return mongoose.isValidObjectId( id )
    }

}