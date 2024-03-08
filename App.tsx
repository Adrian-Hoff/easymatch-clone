import { useFonts } from 'expo-font'
import { Center, NativeBaseProvider, Spinner, StatusBar } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthProvider } from '@contexts/AuthContext'
import Routes from '@routes/index'
import theme from '@theme/index'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular: require('@assets/fonts/Poppins/Poppins-Regular.ttf'),
    Poppins_500Medium: require('@assets/fonts/Poppins/Poppins-Medium.ttf'),
    Poppins_600SemiBold: require('@assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    Poppins_700Bold: require('@assets/fonts/Poppins/Poppins-Bold.ttf'),
  })

  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <SafeAreaView style={{ flex: 1 }}>
          {fontsLoaded ? (
            <Routes />
          ) : (
            <Center flex={1} alignItems={'center'}>
              <Spinner
                color={theme.colors.primary[400]}
                size={64}
                accessibilityLabel={'Carregando'}
              />
            </Center>
          )}
        </SafeAreaView>
      </AuthProvider>
    </NativeBaseProvider>
  )
}
