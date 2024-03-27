// productModel
import { ProductModel } from "../../data";
// Create category DTO
// User Entity
// custom error
// Pagination DTO
import { CreateProductDto, 
        CustomError, 
        PaginationDto 
} from "../../domain";



export class ProductService {

// DI
constructor() {}

// metodos
async createProduct( createProductDto: CreateProductDto ) {
// buscar la producto
const productExists = await ProductModel.findOne({ name: createProductDto.name });
// verificar si existe, en caso de que exista mandamos mensaje de error diciendo que el producto ya existe: la cual no debe de estar repetida
if ( productExists ) throw CustomError.badRequest('Product already exists');

try {
    // creamos una instancia de ProductModel para crear el registro del producto
    const product = new ProductModel( createProductDto );
    // guardamos en la BD
    await product.save();
    // retornamos todo el product
    return product;
    
} catch (error) {
    // este mensaje no deberia de llegar al usuario final
    throw CustomError.internalServer(`${ error }`);
}


}

// obtener productos
async getProducts( paginationDto: PaginationDto) {
// desestructurar de paginationDTO
const {page, limit } = paginationDto;

// cuando se hace interacciones con la BD por lo general se hace con un trycatch
try {

    const [ total, products ] = await Promise.all([
        // total de registros
        ProductModel.countDocuments(),
        ProductModel.find()
        // skip
        .skip( (page - 1) * limit )
        // cantidad de registros a traer
        .limit( limit )
        // populate: llenar una relacion con informacion de ID que alla en un JSON
        .populate('user')
        .populate('category')
    ]);


    // retornamos las categorias
    return {
        page: page,
        limit: limit,
        total: total, 
        next: `/api/products?page=${ (page + 1) }&limit=${ limit }`,
        prev: (page - 1 > 0) ? `/api/products?page=${ ( page-1 ) }&limit=${ limit }`: null,
        products: products
    }

} catch (error) {
    throw CustomError.internalServer('Internal Server Error');
}

}


}