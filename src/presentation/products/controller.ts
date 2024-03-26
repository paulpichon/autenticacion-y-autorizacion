// Category controller

// custom error
import { Request, Response } from "express";
// CreateCategoryDto
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
// Category service
import { CategoryService } from "../services/category.service";


export class ProductController {
    // Inyeccion de dependencias
    constructor(
        //todo private readonly productService: ProductService
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

    // crear producto
    createProduct = ( req: Request, res: Response) => {
        // llamamos el metodo de CreateCategoryDto
        // const [ error, createCategoryDto ] = CreateCategoryDto.create( req.body )
        // // si hay un error lo mostramos
        // if ( error ) return res.status( 400 ).json({ error });
        // console.log( createCategoryDto );
        
        // this.categoryService.createCategory( createCategoryDto!, req.body.user )
        // .then( category => res.status(201).json( category ) )
        // // manejo de errores
        // .catch( error => this.handleError( error, res ) );
        
        return res.json('create products');

    }
    // obtener productos
    getProducts = async( req: Request, res: Response) => {
        
        // obtener parametros de la REQUEST
        const { page = 1, limit = 10 } = req.query;
        // +page, +limit ---> de esta forma convertimos los strings de page y de limit en numeros
        const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
        // si hay un error mostramos una alerta
        if ( error ) return res.status(400).json({ error });

        return res.json('get products');

        // this.categoryService.getCategories( paginationDto! )
        //     .then( categories => res.json( categories ))
        //     // manejo de errores
        //     .catch( error => this.handleError( error, res ) );
        
    }

}