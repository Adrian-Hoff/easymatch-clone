import { useTheme } from 'native-base'
import {
  MaterialTopTabNavigationProp,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs'
import { useAuth } from '@hooks/useAuth'
import { ISurgery } from '@interfaces/App/ISurgery'
import SurgeryDetailsInfoScreen from '@screens/App/SurgeryDetailsScreen/SurgeryDetailsInfoScreen'
import SurgeryDetailsPendingScreen from '@screens/App/SurgeryDetailsScreen/SurgeryDetailsPendingScreen'

type SurgeryDetailsRoutes = {
  surgeryDetailsInfo: ISurgery
  surgeryDetailsPending: undefined
}

export type SurgeriesDetailsNavigatorRoutesProps =
  MaterialTopTabNavigationProp<SurgeryDetailsRoutes>

const { Navigator, Screen } =
  createMaterialTopTabNavigator<SurgeryDetailsRoutes>()

export interface SurgeryDetailsProps {
  route: { params: ISurgery }
}

export function SurgeryDetailsRoutes({ route }: SurgeryDetailsProps) {
  const { colors, fonts, fontSizes } = useTheme()
  const { user } = useAuth()

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
        tabBarActiveTintColor: colors.primary[400],
      }}
      sceneContainerStyle={{
        backgroundColor: colors.white,
      }}
    >
      <Screen
        name="surgeryDetailsInfo"
        options={{
          tabBarLabel: 'Informações',
          tabBarContentContainerStyle: {
            display: route.params.authorId === user?.uid ? 'flex' : 'none',
          },
        }}
      >
        {() => <SurgeryDetailsInfoScreen route={route} />}
      </Screen>

      {route.params.authorId === user?.uid ? (
        <Screen
          name="surgeryDetailsPending"
          options={{
            tabBarLabel: 'Pendências',
          }}
        >
          {() => <SurgeryDetailsPendingScreen route={route} />}
        </Screen>
      ) : null}
    </Navigator>
  )
}
