// Category controller

// custom error
import { Request, Response } from "express";
// CreateCategoryDto
// Create Products DTO
import {CreateProductDto, 
        CustomError, 
        PaginationDto 
} from "../../domain";
// Product service
import { ProductService } from "../services/product.service";



export class ProductController {
    // Inyeccion de dependencias
    constructor(
        private readonly productService: ProductService
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
        // llamamos el metodo de CreateProductDto
        const [ error, createProductDto ] = CreateProductDto.create({ 
            ...req.body,
            user: req.body.user.id
        });
        // si hay un error lo mostramos
        if ( error ) return res.status( 400 ).json({ error });
        
        this.productService.createProduct( createProductDto! )
        .then( category => res.status(201).json( category ) )
        // manejo de errores
        .catch( error => this.handleError( error, res ) );
    }
    // obtener productos
    getProducts = async( req: Request, res: Response) => {
        
        // obtener parametros de la REQUEST
        const { page = 1, limit = 10 } = req.query;
        // +page, +limit ---> de esta forma convertimos los strings de page y de limit en numeros
        const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
        // si hay un error mostramos una alerta
        if ( error ) return res.status(400).json({ error });

        this.productService.getProducts( paginationDto! )
            .then( products => res.json( products ))
            // manejo de errores
            .catch( error => this.handleError( error, res ) );
        
    }

}