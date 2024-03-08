import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '@hooks/useAuth'
import { AuthRoutes } from './AuthRoutes'
import { AppRoutes } from './AppRoutes'

export default function Routes() {
  const { signed } = useAuth()

  return (
    <NavigationContainer>
      {signed ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
