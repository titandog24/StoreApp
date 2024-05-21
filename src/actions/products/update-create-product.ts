import { isAxiosError } from 'axios';
import { tesloAPI } from '../../config/api/tesloAPI';
import { Product } from '../../domain/entities/Product';

const prepareImages = async(images: string[]) => {

    const fileimages = images.filter(image => image.includes('file://'));
    const currentImages = images.filter(image => !image.includes('file://'));

    if (fileimages.length > 0) {
        const uploadPromises = fileimages.map(uploadImage);
        const uploadedImages = await Promise.all(uploadPromises);
        currentImages.push(...uploadedImages)
    }


    return currentImages.map(
        image => image.split('/').pop()
    )
}

const uploadImage = async(image: string) => {
    const formData = new FormData();
    formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: image.split('/').pop()
    })

    const {data} = await tesloAPI.post<{image:string}>('/files/product',formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return data.image;
}

export const updateCreateProduct = (product: Partial<Product>) => {

    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    if (product.id && product.id !== 'new') {
        return updateProduct(product);
    } else {
        return createProduct(product);
    }
}

const updateProduct = async (product: Partial<Product>): Promise<Product> => {

    try {
        const { id, images = [], ...rest } = product;

        const checkImages = await prepareImages(images);

        const { data } = await tesloAPI.patch(`/products/${id}`, {
            images: checkImages,
            ...rest
        });
        
        return data;

    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.message.toString());
            
        }
        console.log(error);
        throw new Error("error al actualizar el producto");
    }

}

const createProduct = async(product: Partial<Product>) => {
    try {
        const { id, images = [], ...rest } = product;

        const checkImages = await prepareImages(images);

        const { data } = await tesloAPI.post(`/products/`, {
            images: checkImages,
            ...rest
        });
        
        return data;

    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.message.toString());
            
        }
        console.log(error);
        throw new Error("error al actualizar el producto");
    }
}