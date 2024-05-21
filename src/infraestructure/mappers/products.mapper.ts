import { API_URL } from "@env";
import { Product } from "../../domain/entities/Product";
import { TesloProducts } from "../interfaces/teslo-products.response";


export class ProductMapper {
    static tesloProductToEntity(tesloProduct: TesloProducts): Product {
        return {
            id: tesloProduct.id,
            description: tesloProduct.description,
            gender: tesloProduct.gender,
            images: tesloProduct.images.map(img => `${API_URL}/files/product/${img}`),
            price: tesloProduct.price,
            sizes: tesloProduct.sizes,
            slug: tesloProduct.slug,
            stock: tesloProduct.stock,
            tags: tesloProduct.tags,
            title: tesloProduct.title,
        }
    }
}