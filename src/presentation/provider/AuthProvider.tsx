import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import { RootStackParams } from '../navigation/StackNavigation'
import { useAuthStore } from '../screens/store/auth/useAuthStore'
import { Children, PropsWithChildren, useEffect } from 'react'

export const AuthProvider = ({children}:PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { checkStatus, status } = useAuthStore();;
    
    useEffect(() => {
      checkStatus();
    }, [])
    
    useEffect(() => {

        if (status !== 'checking') {
            if (status === 'authenticated') {
                navigation.reset({
                    index:0,
                    routes:[{name: 'HomeScreen'}]
                })
            } else {
                navigation.reset({
                    index:0,
                    routes:[{name: 'LoginScreen'}]
                })
            }
        }

    }, [status])
    


    return (
        <>
            {children}
        </>
    )
}

