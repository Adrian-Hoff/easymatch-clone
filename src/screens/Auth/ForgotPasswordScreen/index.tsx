import { ScrollView, Text, VStack, useTheme } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { query, collection, where, getDocs } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { zodResolver } from '@hookform/resolvers/zod'
import { db } from '@config/firebase'
import ButtonComponent from '@components/ButtonComponent'
import InputComponent from '@components/InputComponent'
import ToastComponent from '@components/ToastComponent'
import { useAuth } from '@hooks/useAuth'
import { AuthNavigatorRoutesProps } from '@routes/AuthRoutes'
import { forgotPasswordSchema } from '@utils/schemas'
import AuthHeaderComponent from '../components/AuthHeaderComponent'

interface ForgotPasswordFormProps {
  email: string
}

export default function ForgotPasswordScreen() {
  const { colors, fonts, fontSizes } = useTheme()
  const { loading, resetPassword } = useAuth()
  const { goBack, navigate } = useNavigation<AuthNavigatorRoutesProps>()
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormProps>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onSubmit',
  })

  async function handleCheckIfEmailExistsInFirebase() {
    const q = query(
      collection(db, 'users'),
      where('email', '==', getValues('email')),
    )

    const response = await getDocs(q)
    const { docs } = response

    if (docs.length === 0) {
      ToastComponent({
        type: 'error',
        message: 'Não existe uma conta com esse e-mail',
      })
    } else {
      handleResetPassword()
    }
  }

  async function handleResetPassword() {
    await resetPassword(getValues('email'))
    navigate('signIn')
  }

  return (
    <ScrollView
      px={6}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack space={10}>
        <AuthHeaderComponent
          title={'Recuperar Senha'}
          subtitle={'Informe o e-mail da sua conta para recuperar sua senha'}
          navigateBack={() => goBack()}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
              returnKeyType="send"
              onSubmitEditing={handleSubmit(handleResetPassword)}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Text
          color={colors.text[400]}
          fontSize={fontSizes.sm}
          fontFamily={fonts.mono}
        >
          Pode levar alguns minutos. Verifique a sua caixa de spam
        </Text>
        <ButtonComponent
          isLoading={loading}
          title="Enviar link"
          onPress={handleSubmit(handleCheckIfEmailExistsInFirebase)}
        />
      </VStack>
    </ScrollView>
  )
}
