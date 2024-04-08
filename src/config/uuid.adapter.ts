// adaptador de UUID

import { v4 as uuidv4 } from 'uuid';

// clase
export class Uuid {
     // static v4() {
    //     return uuidv4();
    // }
    // lo de arriba seria igual a lo de abajo
    // esto es igual a lo de arriba
    static v4 = () => uuidv4()

}
