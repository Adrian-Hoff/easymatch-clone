import { Icon, useTheme } from 'native-base'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import { SurgeryProvider } from '@contexts/SurgeryContext'
import StackHeaderAppComponent from '@components/StackHeaderAppComponent'
import { useAuth } from '@hooks/useAuth'
import { ISurgery } from '@interfaces/App/ISurgery'
import DashboardScreen from '@screens/App/DashboardScreen'
import AddSurgeryScreen from '@screens/App/AddSurgeryScreen'
import { SurgeryDetailsRoutes } from '@routes/AppRoutes/SurgeryDetailsRoutes'
import SurgeryRoutes from './SurgeryListRoutes'
import MatchRequestScreen from '@screens/App/MatchRequestScreen'
import { IMatchRequest } from '@interfaces/App/IMatchRequest'
import { useNavigation } from '@react-navigation/native'

type GeneralAppRoutes = {
  dashboard: undefined
  addSurgery: undefined
  surgeries: undefined
  surgeryDetails: ISurgery
  matchRequest: IMatchRequest
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<GeneralAppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<GeneralAppRoutes>()

export function AppRoutes() {
  const { colors } = useTheme()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { occupation } = useAuth()

  return (
    <SurgeryProvider>
      <Navigator
        screenOptions={{
          headerShown: true,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.primary[400],
          tabBarStyle: {
            backgroundColor: colors.white,
            height: 70,
            elevation: 0,
            borderTopWidth: 0,
            paddingBottom: 0,
          },
        }}
        sceneContainerStyle={{
          backgroundColor: colors.white,
        }}
      >
        <Screen
          name="dashboard"
          component={DashboardScreen}
          options={{
            header: () => <StackHeaderAppComponent action="NOTIFICATIONS" />,
            tabBarIcon: ({ color }) => (
              <Icon
                as={MaterialIcons}
                name="home-filled"
                size={8}
                color={color}
              />
            ),
          }}
        />

        {occupation === 'surgeon' ? (
          <Screen
            name="addSurgery"
            component={AddSurgeryScreen}
            options={{
              header: () => (
                <StackHeaderAppComponent
                  title="Criar Cirurgia"
                  subTitle="Preencha os campos abaixo com as informacões da cirurgia que deseja criar"
                  pb={12}
                />
              ),
              tabBarIcon: ({ color }) => (
                <Icon as={MaterialIcons} name="add" size={8} color={color} />
              ),
            }}
          />
        ) : null}

        <Screen
          name="surgeries"
          component={SurgeryRoutes}
          options={{
            header: () => (
              <StackHeaderAppComponent
                title="Cirurgias e Matches"
                subTitle={
                  'Gerencie cirurgias em que você participa ou se candidate a uma'
                }
                pb={12}
              />
            ),
            tabBarIcon: ({ color }) => (
              <Icon
                as={MaterialIcons}
                name="format-list-bulleted"
                size={8}
                color={color}
              />
            ),
          }}
        />

        <Screen
          name="surgeryDetails"
          component={SurgeryDetailsRoutes}
          options={{
            header: () => (
              <StackHeaderAppComponent
                title="Detalhes"
                canGoBack
                goBackTo={() => navigate('surgeries')}
              />
            ),
            tabBarButton: () => null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />

        <Screen
          name="matchRequest"
          component={MatchRequestScreen}
          options={{
            headerShown: false,
            tabBarButton: () => null,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
      </Navigator>
    </SurgeryProvider>
  )
}
