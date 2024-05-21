import { Button, ButtonGroup, Input, Layout, useTheme } from '@ui-kitten/components'
import { Formik } from 'formik'
import { genders, sizes } from '../../../config/constantes/constantes';
import { MainLayout } from '../../layouts/MainLayout'
import { MyIcon } from '../../components/ui/MyIcon'
import { ProductImages } from '../../components/products/ProductImages';
import { RootStackParams } from '../../navigation/StackNavigation'
import { ScrollView } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'
import { useTanStack } from '../../hooks/useTanStack';
import { CameraAdapter } from '../../../config/adapters/camera-adapter';




interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route }: Props) => {

  const theme = useTheme();

  const {mutation, product} = useTanStack(route.params.productId)


  if (!product || product === undefined) {
    <MainLayout title='Cargando...' />
    return
  }

  return (
    <Formik
      initialValues={product!}
      onSubmit={value => mutation.mutate(value)}>
      {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
        <MainLayout
          title={values?.title!}
          subTitle={`Precio: ${values?.price}`}
          rightAction={async() => {
            const photos = await CameraAdapter.getPicturesFromLibrary();
            setFieldValue('images', [...values.images, ...photos])
            console.log(photos);
            
          }}
          rightActionIcon='image-outline'>
          <ScrollView>
            <Layout style={{justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
              <ProductImages images={values.images} />
            </Layout>

            <Layout style={{ marginHorizontal: 10 }}>
              <Input
                label={'Titulo producto'}
                value={values?.title}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange('title')}
              />
              <Input
                label={'Slug'}
                value={values?.slug}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange('slug')}

              />
              <Input
                label={'Descripción'}
                value={values?.description}
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange('description')}

              />
            </Layout>

            <Layout style={{ marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
              <Input
                label={"Precio"}
                value={values?.price.toString()}
                style={{ flex: 1 }}
                onChangeText={handleChange('price')}
                keyboardType='numeric'

              />
              <Input
                label={"Inventario"}
                value={values?.stock.toString()}
                style={{ flex: 1 }}
                onChangeText={handleChange('stock')}
                keyboardType='numeric'

              />
            </Layout>
            <ButtonGroup
              style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
              size='small'
              appearance='outline'>
              {
                sizes.map((size) =>
                  <Button
                    key={size}
                    onPress={() => setFieldValue('sizes',
                      values.sizes.includes(size)
                      ? values.sizes.filter(s => s !== size)
                      : [...values.sizes, size]
                    )}
                    style={{
                      flex: 1,
                      backgroundColor: values.sizes.includes(size) ? theme['color-primary-200'] : undefined
                    }}>{size}</Button>
                )
              }
            </ButtonGroup>
            <ButtonGroup
              style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
              size='small'
              appearance='outline'>
              {
                genders.map((gender) =>
                  <Button
                    onPress={() => setFieldValue('gender', gender)}
                    key={gender}
                    style={{
                      flex: 1,
                      backgroundColor: values.gender.startsWith(gender) 
                      ? theme['color-primary-200']
                      : undefined
                    }}>{gender}</Button>
                )
              }
            </ButtonGroup>

            <Button
              accessoryLeft={<MyIcon name='save-outline' white />}
              onPress={() => handleSubmit()}
              style={{ margin: 15 }}>Guardar</Button>

            <Layout style={{ height: 150 }} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  )
}

