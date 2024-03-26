

export class CreateProductDto {

    // constructor
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string, //ID del usuario
        public readonly category: string,
    ){}

    // metodos

    // 
        static create( props : { [key: string]: any } ): [string?, CreateProductDto?] {
            // desestructuramos de los props
            const {
                name,
                available,
                price,
                description,
                user,
                category,
            } = props;

            // validar si no viene cada una de las propiedades
            if ( !name ) return ['Missing name'];
            if ( !user ) return ['Missing user'];
            if ( !category ) return ['Missing category'];

            // si todo sale bien
            return [
                undefined,
                new CreateProductDto(
                    name,
                    // si viene un string en lugar de un boolean 
                    // con !! lo  podemos tomar como si fuera un boolean
                    !!available,
                    price,
                    description,
                    user,
                    category,
                )
            ];

        }


}