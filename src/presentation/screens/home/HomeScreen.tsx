import { FAB } from '../../components/ui/FAB';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { getProductsByPage } from '../../../actions/products/get-products-byPage';
import { MainLayout } from '../../layouts/MainLayout';
import { ProductList } from '../../components/products/ProductList';
import { RootStackParams } from '../../navigation/StackNavigation';
import { StackScreenProps } from '@react-navigation/stack';
import { useAuthStore } from '../store/auth/useAuthStore'
import { useInfiniteQuery } from '@tanstack/react-query';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}:Props) => {

  const { logout } = useAuthStore();

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,


    queryFn: async (params) => {
      return await getProductsByPage(params.pageParam)
    },
    getNextPageParam: (lastPage, allPage) => allPage.length,
  })

  return (
    <>
      <MainLayout
        title='TesloShop - Products'
        subTitle='Aplicación Administrativa'>
        {
          isLoading
            ? <FullScreenLoader />
            : <ProductList products={data?.pages.flat() ?? []} fetchNextPage={fetchNextPage} />
        }


      </MainLayout>
      <FAB style={{
        position: 'absolute',
        bottom: 20,
        right: 20
      }}
        onPress={() => navigation.navigate('ProductScreen', {productId: 'new'})} />
    </>
  )
}

