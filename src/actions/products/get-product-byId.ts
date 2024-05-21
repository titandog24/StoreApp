import { tesloAPI } from "../../config/api/tesloAPI";
import { Gender, Product } from "../../domain/entities/Product";
import { TesloProducts } from "../../infraestructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infraestructure/mappers/products.mapper";

const emptyProduct: Product = {
    id: '',
    description: '',
    gender: Gender.Unisex,
    images: [],
    price: 0,
    sizes: [],
    slug: '',
    stock: 0,
    tags: [],
    title: '',
}



export const getProdctById = async (id: string) => {
    try {
        if (id === 'new') {
            return emptyProduct;
        } else {
            const {data} = await tesloAPI.get<TesloProducts>(`/products/${id}`);  
            return ProductMapper.tesloProductToEntity(data);
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}