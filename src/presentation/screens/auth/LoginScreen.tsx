

import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { Alert, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';
import { useState } from 'react';
import { useAuthStore } from '../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ({ navigation }: Props) => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isPosting, setIsPosting] = useState(false)

  const { login, user } = useAuthStore();

  const { height } = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    setIsPosting(true);
    const wasSuccesfull = await login(form.email, form.password);
    setIsPosting(false);

    if (wasSuccesfull) return;

    Alert.alert('Error', 'usuario o contraseña incorrectos');
  }


  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">Ingresar</Text>
          <Text category='p2'>Por favor, ingrese para continuar</Text>
        </Layout>

        <Layout>
          <Input
            placeholder='Correo electrónico'
            keyboardType='email-address'
            autoCapitalize='none'
            value={form.email}
            onChangeText={value => setForm({ ...form, email: value })}
            accessoryLeft={<MyIcon name='email-outline' />}
            style={{ marginBottom: 10, marginTop: 10 }}
          />
          <Input
            placeholder='Contraseña'
            autoCapitalize='none'
            secureTextEntry
            value={form.password}
            onChangeText={value => setForm({ ...form, password: value })}
            accessoryLeft={<MyIcon name='lock-outline' />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout>
          <Button onPress={onLogin}
            disabled={isPosting}
            accessoryRight={<MyIcon name='arrow-forward-outline' />}>
            Ingresar
          </Button>
        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text>¿No tienes una cuenta? </Text>
          <Text
            status='primary'
            category='s1'
            onPress={() => navigation.navigate('RegisterScreen')}>Crea una</Text>
        </Layout>
      </ScrollView>
    </Layout>
  )
}

