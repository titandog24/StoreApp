import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'>{}

export const RegisterScreen = ({navigation}:Props) => {

  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.30 }}>
          <Text category="h1">Crear Cuenta</Text>
          <Text category='p2'>Por favor, crea una cuenta para continuar</Text>
        </Layout>

        <Layout>
          <Input
            placeholder='Nombre Completo'
            accessoryLeft={<MyIcon name='person-outline' />}
            style={{ marginBottom: 10, marginTop: 10 }}
          />
           <Input
            placeholder='Correo electrónico'
            keyboardType='email-address'
            autoCapitalize='none'
            accessoryLeft={<MyIcon name='email-outline' />}
            style={{ marginBottom: 10, marginTop: 10 }}
          />
          <Input
            placeholder='Contraseña'
            autoCapitalize='none'
            accessoryLeft={<MyIcon name='lock-outline' />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout>
          <Button onPress={() => { }}
          accessoryRight={<MyIcon name='save-outline' />}>
            Crear
          </Button>
        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text>¿Ya tienes una cuenta? </Text>
          <Text 
            status='primary'
            category='s1'
            onPress={() => navigation.goBack()}>Iniciar Sesión</Text>
        </Layout>
      </ScrollView>
    </Layout>
  )
}

