import { Layout, List, Text } from '@ui-kitten/components'
import { Product } from '../../../domain/entities/Product'
import { ProductCard } from './ProductCard'
import { useState } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';
import { useQueryClient } from '@tanstack/react-query';
interface Props {
    products: Product[],
    fetchNextPage: () => void;
}
export const ProductList = ({ products, fetchNextPage }: Props) => {
    const queryClient = useQueryClient();
    const [isRefreshin, setisRefreshin] = useState(false)

    const onPullToRefresh = async () => {
        setisRefreshin(true);
        queryClient.invalidateQueries({queryKey: ['products','infinite']})
        
        await new Promise(resolve => setTimeout(resolve, 200));
        setisRefreshin(false);
    }

    return (
        <List
            data={products}
            numColumns={2}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
                <ProductCard product={item} />
            )}

            ListFooterComponent={() => <Layout style={{ height: 150 }} />}
            onEndReachedThreshold={0.5}
            onEndReached={fetchNextPage}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshin}
                    onRefresh={onPullToRefresh}
                />
            }
        />
    )
}

