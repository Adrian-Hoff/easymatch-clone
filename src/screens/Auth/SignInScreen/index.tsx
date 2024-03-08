import { useState } from 'react'
import { Text, ScrollView, VStack, useTheme, Box } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import Svg, {
  Defs,
  Stop,
  TSpan,
  Text as TextSVG,
  LinearGradient,
} from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InputComponent from '@components/InputComponent'
import ButtonComponent from '@components/ButtonComponent'
import { ISignIn } from '@interfaces/Auth/ISignIn'
import { useAuth } from '@hooks/useAuth'
import { AuthNavigatorRoutesProps } from '@routes/AuthRoutes'

export default function SignInScreen() {
  const { colors, fonts, fontSizes } = useTheme()
  const { loading, signIn } = useAuth()
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()
  const { control, getValues, setFocus } = useForm<ISignIn>()
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

  function handleSignIn(email: string, password: string) {
    signIn(email, password)
  }

  return (
    <ScrollView
      px={6}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Box pt={8} w={'100%'}>
        <Text fontSize={fontSizes['3xl']} color={'transparent'}>
          EasyMatch
        </Text>
      </Box>
      <Svg style={{ position: 'absolute', top: 32, padding: 0 }}>
        <Defs>
          <LinearGradient
            id="rainbow"
            x1={'0'}
            x2={'100%'}
            y1={'0'}
            y2={'0'}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={'#00154D'} offset={'0%'} />
            <Stop stopColor={'#6F9FE7'} offset={'100%'} />
          </LinearGradient>
        </Defs>
        <TextSVG fill={'url(#rainbow)'}>
          <TSpan fontWeight={'bold'} fontSize={30} x={0} y={30}>
            EasyMatch
          </TSpan>
        </TextSVG>
      </Svg>
      <VStack space={3} py={10}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              onSubmitEditing={() =>
                setFocus('password', { shouldSelect: true })
              }
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder="Senha"
              type={visiblePassword ? 'text' : 'password'}
              onChangeText={onChange}
              value={value}
              returnKeyType="send"
              onSubmitEditing={() =>
                handleSignIn(getValues('email'), getValues('password'))
              }
              iconRight={{
                element: (
                  <MaterialCommunityIcons
                    name={visiblePassword ? 'eye-outline' : 'eye-off-outline'}
                    size={24}
                    color={colors.gray[400]}
                  />
                ),
                onPress: () => setVisiblePassword(!visiblePassword),
              }}
            />
          )}
        />
        <Text
          color={colors.text[400]}
          fontSize={fontSizes.sm}
          fontFamily={fonts.mono}
        >
          Esqueceu sua senha?{' '}
          <Text
            color={colors.primary[400]}
            fontSize={fontSizes.sm}
            fontFamily={fonts.body}
            onPress={() => navigate('forgotPassword')}
          >
            Clique aqui
          </Text>
        </Text>
      </VStack>
      <VStack space={3}>
        <ButtonComponent
          isLoading={loading}
          title="Entrar"
          onPress={() =>
            handleSignIn(getValues('email'), getValues('password'))
          }
        />
        <ButtonComponent
          title="Criar Conta"
          variant="outline"
          onPress={() => navigate('signUp')}
        />
      </VStack>
    </ScrollView>
  )
}
