import { memo, useState } from 'react'
import { VStack, ScrollView, Text, useTheme } from 'native-base'
import { useForm } from 'react-hook-form'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { zodResolver } from '@hookform/resolvers/zod'
import { db } from '@config/firebase'
import ButtonComponent from '@components/ButtonComponent'
import ToastComponent from '@components/ToastComponent'
import { ISignUp } from '@interfaces/Auth/ISignUp'
import { useAuth } from '@hooks/useAuth'
import { AuthNavigatorRoutesProps } from '@routes/AuthRoutes'
import { signUpFirstSchema, signUpSecondSchema } from '@utils/schemas'
import AuthHeaderComponent from '../components/AuthHeaderComponent'
import SignUpFirstScreen from './SignUpFirstScreen'
import SignUpSecondScreen from './SignUpSecondScreen'

function SignUpScreens() {
  const { colors, fonts, fontSizes } = useTheme()
  const { loading, signUp } = useAuth()
  const { navigate, goBack } = useNavigation<AuthNavigatorRoutesProps>()
  const [step, setStep] = useState<number>(0)
  const schemas = [signUpFirstSchema, signUpSecondSchema]
  const { control, handleSubmit, getValues } = useForm<ISignUp>({
    resolver: zodResolver(schemas[step]),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const steps = [
    <SignUpFirstScreen key={0} control={control} />,
    <SignUpSecondScreen key={1} control={control} />,
  ]
  const isLastStep = step === steps.length - 1

  async function handleCheckIfEmailAlreadyExistsInFirebase() {
    const q = query(
      collection(db, 'users'),
      where('email', '==', getValues('email')),
    )

    const response = await getDocs(q)
    const { docs } = response

    if (docs.length !== 0) {
      ToastComponent({
        type: 'error',
        message: 'Já existe uma conta com esse e-mail',
      })
    } else {
      setStep(step + 1)
    }
  }

  function handleAddUser() {
    signUp(
      getValues('name'),
      getValues('email'),
      getValues('occupation'),
      getValues('areasOfExpertise'),
      getValues('agreements') as string,
      getValues('password'),
    )
  }

  return (
    <ScrollView
      px={6}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 24,
      }}
      showsVerticalScrollIndicator={false}
    >
      <VStack space={10}>
        <AuthHeaderComponent
          title={`Criar Conta: ${step + 1} de 2`}
          subtitle="Preencha os campos abaixo para criar sua conta"
          navigateBack={step === 0 ? () => goBack() : () => setStep(step - 1)}
        />
        {steps[step]}
        <Text
          color={colors.text[400]}
          fontSize={fontSizes.sm}
          fontFamily={fonts.mono}
        >
          Para criar sua conta você deve estar de acordo com os nossos{' '}
          <Text
            color={colors.primary[400]}
            fontSize={fontSizes.sm}
            fontFamily={fonts.body}
            onPress={() => navigate('termsOfUse')}
          >
            termos de uso{' '}
          </Text>
          e{' '}
          <Text
            color={colors.primary[400]}
            fontSize={fontSizes.sm}
            fontFamily={fonts.body}
            onPress={() => navigate('privacyPolicy')}
          >
            política de privacidade
          </Text>
        </Text>
        <ButtonComponent
          isLoading={loading}
          title={isLastStep ? 'Concluir' : 'Próximo'}
          onPress={handleSubmit(
            isLastStep
              ? handleAddUser
              : step === 0
              ? handleCheckIfEmailAlreadyExistsInFirebase
              : () => setStep(step + 1),
          )}
        />
      </VStack>
    </ScrollView>
  )
}

export default memo(SignUpScreens)
