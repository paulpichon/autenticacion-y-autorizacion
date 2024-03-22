

export class PaginationDto {
    // constructor
    private constructor(
        public readonly page: number,
        public readonly limit: number,
    ){}

    // metodos
    // podemos enviar parametros inicializados
    static create( page: number = 1, limit: number = 10 ): [string?, PaginationDto?] {

        // validar que sea un numero page y limit
        if ( isNaN(page) || isNaN(limit) ) return ['Page and Limit must be a numbers'];
        // validar que la pagina sea mayor o igual a 1
        if ( page <= 0) return ['Page must be greater than 0'];
        // validar que el limite sea mayor o igual a 1
        if ( limit <= 0 ) return ['Limit must be greater than 0'];

        // regresamos el PaginationDto
        return[ undefined,  new PaginationDto( page, limit )];
    }
}