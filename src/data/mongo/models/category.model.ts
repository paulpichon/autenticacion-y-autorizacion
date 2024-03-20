// Categorias: cada categoria debe registrar quien fue el usuario que la creo
// Mongoose
import mongoose, { Schema } from "mongoose";

// Schema de la categoria
const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required']
    },
    available: {
        type: String,
        default: false
    },
    // crear una relacion con un usuario
    user: {
        // Schema.Types.ObjectId --> esto significa que debe ser un valor de este tipo
        tpye: Schema.Types.ObjectId,
        // ponemos la referencia a la coleccion en este caso es User del modelo/archivo User.model.ts
        ref: 'User',
        required: true,
    }
});
// exportar el schema
export const CategoryModel = mongoose.model('Category', categorySchema);
