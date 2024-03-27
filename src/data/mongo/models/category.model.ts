// Categorias: cada categoria debe registrar quien fue el usuario que la creo
// Mongoose
import mongoose, { Schema } from "mongoose";

// Schema de la categoria
const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required'],
        unique: true
    },
    available: {
        type: String,
        default: false
    },
    // crear una relacion con un usuario
    user: {
        // Schema.Types.ObjectId --> esto significa que debe ser un valor de este tipo
        type: Schema.Types.ObjectId,
        // ponemos la referencia a la coleccion en este caso es User del modelo/archivo User.model.ts
        ref: 'User',
        required: true,
    }
});
// serializar la respuesta
categorySchema.set('toJSON',{
    // pone el ID que creamos
    virtuals: true,
    // quita __v
    versionKey: false,
    // quitar algunas propiedades que no queremos ver en el JSON
    transform: function( doc, ret, options ) {
        delete ret._id;
    }   
});
// exportar el schema
export const CategoryModel = mongoose.model('Category', categorySchema);
