import { tesloAPI } from "../../config/api/tesloAPI"
import { Product } from "../../domain/entities/Product";
import type { TesloProducts } from "../../infraestructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infraestructure/mappers/products.mapper";


export const getProductsByPage = async (page:number, limit: number = 20) : Promise<Product[]> => {
    try {
        const {data} = await tesloAPI.get<TesloProducts[]>(`/products?offset=${page*10}&limit=${limit}`);
        const product = data.map(tesloProduct => ProductMapper.tesloProductToEntity(tesloProduct));

        return product.sort();
    } catch (error) {
        console.log(error);
        throw new Error('Error getting products');
    }
}