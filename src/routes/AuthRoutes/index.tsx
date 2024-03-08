import { useTheme } from 'native-base'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import SignInScreen from '@screens/Auth/SignInScreen'
import SignUpScreens from '@screens/Auth/SignUpScreens'
import ForgotPasswordScreen from '@screens/Auth/ForgotPasswordScreen'
import TermsOfUseScreen from '@screens/Auth/TermsOfUseScreen'
import PrivacyPolicyScreen from '@screens/Auth/PrivacyPolicyScreen'

type AuthRoutesProps = {
  signIn: undefined
  signUp: undefined
  forgotPassword: undefined
  termsOfUse: undefined
  privacyPolicy: undefined
}

export type AuthNavigatorRoutesProps =
  NativeStackNavigationProp<AuthRoutesProps>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesProps>()

export function AuthRoutes() {
  const { colors } = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Screen name="signIn" component={SignInScreen} />
      <Screen name="signUp" component={SignUpScreens} />
      <Screen name="forgotPassword" component={ForgotPasswordScreen} />
      <Screen name="termsOfUse" component={TermsOfUseScreen} />
      <Screen name="privacyPolicy" component={PrivacyPolicyScreen} />
    </Navigator>
  )
}
