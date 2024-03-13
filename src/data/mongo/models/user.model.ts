// Mongoose
import mongoose from "mongoose";

// Schema del usuario
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required']
    },
    email: {
        type: String,
        required: [ true, 'Email is required'],
        unique: true
    },
    emailValidated: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [ true, 'Password is required']
    },
    img: {
        type: String
    },
    role: {
        // se coloca entre [] porque podria tener mas de 1 rol de usuario
        type: [String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    }
});
// exportar el schema
export const UserModel = mongoose.model('User', userSchema);
