import { useTheme } from 'native-base'
import {
  MaterialTopTabNavigationProp,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs'
import AvailableSurgeriesListScreen from '@screens/App/SurgeriesList/AvailableSurgeriesListScreen'
import MatchSurgeriesListScreen from '@screens/App/SurgeriesList/MatchSurgeriesListScreen'
import MySurgeriesScreen from '@screens/App/SurgeriesList/MySurgeriesScreen'
import { useAuth } from '@hooks/useAuth'

type SurgeryListRoutes = {
  surgeriesListAvailable: undefined
  surgeriesListMatch: undefined
  surgeriesListMy: undefined
}

export type SurgeriesNavigatorRoutesProps =
  MaterialTopTabNavigationProp<SurgeryListRoutes>

const { Navigator, Screen } = createMaterialTopTabNavigator<SurgeryListRoutes>()

export default function SurgeryListRoutes() {
  const { colors, fonts, fontSizes } = useTheme()
  const { occupation } = useAuth()

  return (
    <Navigator
      screenOptions={{
        animationEnabled: true,
        tabBarLabelStyle: {
          fontFamily: fonts.body,
          fontSize: fontSizes.sm,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary[400],
        },
        tabBarStyle: {
          elevation: 1,
        },
        tabBarActiveTintColor: colors.primary[400],
      }}
      sceneContainerStyle={{
        backgroundColor: colors.white,
      }}
    >
      {occupation === 'surgeon' ? (
        <Screen
          name="surgeriesListMy"
          options={{
            tabBarLabel: 'Minhas',
          }}
          component={MySurgeriesScreen}
        />
      ) : null}

      <Screen
        name="surgeriesListAvailable"
        options={{
          tabBarLabel: 'Disponíveis',
        }}
        component={AvailableSurgeriesListScreen}
      />

      <Screen
        name="surgeriesListMatch"
        options={{
          tabBarLabel: 'Match',
        }}
        component={MatchSurgeriesListScreen}
      />
    </Navigator>
  )
}
