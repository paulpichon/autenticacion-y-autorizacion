// Create category DTO
// User Entity
// custom error
// Pagination DTO
import {    CreateCategoryDto, 
            CustomError, 
            PaginationDto, 
            UserEntity 
    } from "../../domain";
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

    // obtener categorias
    async getCategories( paginationDto: PaginationDto) {
        // desestructurar de paginationDTO
        const {page, limit } = paginationDto;

        // cuando se hace interacciones con la BD por lo general se hace con un trycatch
        try {
            // total de registros
            // const total = await CategoryModel.countDocuments();
            // // buscar categorias en la BD
            // const categories = await CategoryModel.find()
            //     // skip
            //     .skip( (page - 1) * limit )
            //     // cantidad de registros a traer
            //     .limit( limit )


            const [ total, categories ] = await Promise.all([
                // total de registros
                CategoryModel.countDocuments(),
                CategoryModel.find()
                // skip
                .skip( (page - 1) * limit )
                // cantidad de registros a traer
                .limit( limit )
            ]);


            // retornamos las categorias
            return {
                page: page,
                limit: limit,
                total: total, 
                next: `/api/categories?page=${ (page + 1) }&limit=${ limit }`,
                prev: (page - 1 > 0) ? `/api/categories?page=${ ( page-1 ) }&limit=${ limit }`: null,

                categories: categories.map( category => ({
                    id: category.id,
                    name: category.name,
                    available: category.available
                }))

            }

        } catch (error) {
            throw CustomError.internalServer('Internal Server Error');
        }

    }


}