// Conexion a la BD mongodb
// Mongoose 
import mongoose from "mongoose";

// Interfaz
interface Options {
    mongoUrl: string;
    dbName: string;
}

// classe MongoDatabase
export class MongoDatabase {

    // metodos
    static async connect( options: Options ) {
        // desestructurar de los options
        const { mongoUrl, dbName } = options;

        try {
            // conexion a la BD
            await mongoose.connect( mongoUrl, {
                // nombre de la Base de Datos
                dbName: dbName
            });
            return true;

        } catch (error) {
            console.log('Mongo connection error');
            throw error;
        }

    }

    // metodo para desconectar la BD
    static async disconnect() {
        // desconectar de la BD
        await mongoose.disconnect();
    }

}