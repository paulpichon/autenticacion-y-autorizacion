// bcryptjs
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
// Apadtacion de un paquete de terceros a este proyecto
// BCRYPTJS

// Se puede hacer tanto como un objeto ó como una clase

export const bcryptAdapter = {
    // metodo para hashear una password
    hash: (password: string) => {
        const salt = genSaltSync();
        return hashSync(password, salt);
    },
    // metodo para comparar las contraseñas
    // compare(contraseña mandada, contraseña en la BD)
    compare: (password: string, hashed: string) => {
        return compareSync(password, hashed);
        // retorna true o false
    }
}