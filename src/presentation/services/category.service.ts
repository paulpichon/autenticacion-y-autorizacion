// Create category DTO
// User Entity
// custom error
import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";
// 
import { CategoryModel } from "../../data";



export class CategoryService {

    // DI
    constructor() {}

    // metodos
    async createCategory( createCategoryDto: CreateCategoryDto, user: UserEntity ) {
        // buscar la categoria
        const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });
        // verificar si existe, en caso de que exista mandamos mensaje de error diciendo que la categoria ya existe: la cual no debe de estar repetida
        if ( categoryExists ) throw CustomError.badRequest('Category already exists');

        try {
            // creamos una instancia de CategoryModel para crear el registro de categoria
            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id
            });
            // guardamos en la BD
            await category.save();
            // retornamos lo que va a mostrar al API
            return {
                id: category.id,
                name: category.name,
                available: category.available
            }
            
        } catch (error) {
            // este mensaje no deberia de llegar al usuario final
            throw CustomError.internalServer(`${ error }`);
        }


    }


}