// Productos: cada categoria debe registrar quien fue el usuario que la creo
// Mongoose
import mongoose, { Schema } from "mongoose";

// Schema del producto
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required'],
        unique: true
    },
    available: {
        type: String,
        default: false
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    // crear una relacion con un usuario
    user: {
        // Schema.Types.ObjectId --> esto significa que debe ser un valor de este tipo
        type: Schema.Types.ObjectId,
        // ponemos la referencia a la coleccion en este caso es User del modelo/archivo User.model.ts
        ref: 'User',
        required: true,
    },
    // category
    category: {
        // Schema.Types.ObjectId --> esto significa que debe ser un valor de este tipo
        type: Schema.Types.ObjectId,
        // ponemos la referencia a la coleccion en este caso es Category del modelo/archivo category.model.ts
        ref: 'Category',
        required: true,
    }
});
// exportar el schema
export const ProductModel = mongoose.model('Product', productSchema);
