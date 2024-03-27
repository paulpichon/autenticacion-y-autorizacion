// ENVS
import { envs } from "../../config";
// 
import { CategoryModel, MongoDatabase, ProductModel, UserModel } from "../mongo";
import { seedData } from "./data";


( async () => {
    // mongoose
    MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    });

    await main();

    // terminar la conexion
    await MongoDatabase.disconnect();

})();

// funcion para crear de forma aleatoria
const randomBetween0AndX = ( x: number ) => {
    return Math.floor( Math.random() * x ); //
}

// funcion
async function main() {
    //1.-  borrar todo
    await Promise.all([
        // eliminar registros ---> muchos registros
        UserModel.deleteMany(),
        // eliminar categorias
        CategoryModel.deleteMany(),
        // Eliminar productos
        ProductModel.deleteMany(),
    ]);

    //2.- crear usuarios
    const users = await UserModel.insertMany( seedData.users );
    //3.- crear categorias
    const categories = await  CategoryModel.insertMany(
        seedData.categories.map( category => {

            return {
                ...category,
                user: users[0]._id //usuario
            }

        })
    );
    //4.-  crear productos
    const products = await ProductModel.insertMany(
        seedData.products.map( product => {
            return {
                ...product,
                user: users[ randomBetween0AndX( seedData.users.length -1 ) ]._id,
                category: categories[ randomBetween0AndX( seedData.categories.length -1 )]._id
            }
        })
    );

}