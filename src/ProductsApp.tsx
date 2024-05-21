import { NavigationContainer } from '@react-navigation/native'
import { StackNavigation } from './presentation/navigation/StackNavigation'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from './presentation/provider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

export const ProductsApp = () => {

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const bgColorTheme = colorScheme === 'dark'
    ? theme['color-basic-800']
    : theme['color-basic-100']

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider  {...eva} theme={theme}>
        <NavigationContainer theme={{
          dark: colorScheme === 'dark',
          colors: {
            primary: theme['color-primary-500'],
            background: bgColorTheme,
            card: theme['color-primary-100'],
            text: theme['text-basic-color'],
            border: theme['color-primary-800'],
            notification: theme['color-primary-500']
          }
        }}>
          <AuthProvider>
            <StackNavigation />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>

  )
}

