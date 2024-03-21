

export class CreateCategoryDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
    ) {}


    // metodos
    // metodo estatico: este nos ayudara para poder llamar al constructor, ya que al ser private solo podemos llamar dentro del mismo archivo y no desde afuera de el
        static create(object: { [key: string]: any }): [string?, CreateCategoryDto? ] {

            // desestructuramos del object
            const { name, available = false } = object;
            // crear una variable
            let availableBoolean = available;
            // si no hay name, mostramos un error
            // recordar que [string?, CreateCategoryDto? ] son propieades las que espera el arreglo, sin emabrgo podemos poner el primero y el segundo no poner nada y significaria qeu seria un null
            if ( !name ) return ['Missin name'];

            // verificar si available es diferente un string 'boolean'
            if ( typeof available !== 'boolean') {
                // convertir el string a boolean
                availableBoolean = ( available === 'true' );
            } // podriamos devolver un else con un mensaje diciendo que tipo de valor deberiamos esperar

            return [ undefined, new CreateCategoryDto( name, availableBoolean )];

        }

}