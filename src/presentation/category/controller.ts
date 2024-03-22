// Category controller

// custom error
import { Request, Response } from "express";
// CreateCategoryDto
import { CreateCategoryDto, CustomError } from "../../domain";
// Category service
import { CategoryService } from "../services/category.service";


export class CategoryController {
    // Inyeccion de dependencias
    constructor(
        private readonly categoryService: CategoryService
    ){}
    // manejo de errores
    private handleError = ( error: unknown, res: Response) => {
        // validar si el error es una instancia de nuestro CustomError
        if ( error instanceof CustomError) {
            // retornamos el error
            return res.status( error.statusCode ).json({ error: error.message });
        }
        // 
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal Server Error' });
        
    }

    // crear category
    createCategory = ( req: Request, res: Response) => {
        // llamamos el metodo de CreateCategoryDto
        const [ error, createCategoryDto ] = CreateCategoryDto.create( req.body )
        // si hay un error lo mostramos
        if ( error ) return res.status( 400 ).json({ error });
        console.log( createCategoryDto );
        
        this.categoryService.createCategory( createCategoryDto!, req.body.user )
        .then( category => res.status(201).json( category ) )
        // manejo de errores
        .catch( error => this.handleError( error, res ) );
        
    }
    // obtener categories
    getCategories = async( req: Request, res: Response) => {
        
        this.categoryService.getCategories()
            .then( categories => res.json( categories ))
            // manejo de errores
            .catch( error => this.handleError( error, res ) );
        
    }

}