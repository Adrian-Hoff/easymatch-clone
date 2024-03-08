import { memo, useState } from 'react'
import { VStack, useTheme } from 'native-base'
import { Control, Controller } from 'react-hook-form'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InputComponent from '@components/InputComponent'
import { ISignUp } from '@interfaces/Auth/ISignUp'

interface SignUpFirstProps {
  control: Control<ISignUp>
}

function SignUpFirstScreen({ control }: SignUpFirstProps) {
  const { colors } = useTheme()
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] =
    useState<boolean>(false)

  return (
    <VStack space={3}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <InputComponent
            placeholder="Nome"
            onChangeText={onChange}
            returnKeyType="next"
            value={value}
            errorMessage={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <InputComponent
            placeholder="E-mail"
            onChangeText={onChange}
            returnKeyType="next"
            value={value}
            errorMessage={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <InputComponent
            type={visiblePassword ? 'text' : 'password'}
            placeholder="Criar senha"
            onChangeText={onChange}
            returnKeyType="next"
            value={value}
            errorMessage={errors.password?.message}
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
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <InputComponent
            type={visibleConfirmPassword ? 'text' : 'password'}
            placeholder="Confirmar senha"
            onChangeText={onChange}
            returnKeyType="next"
            value={value}
            errorMessage={errors.confirmPassword?.message}
            iconRight={{
              element: (
                <MaterialCommunityIcons
                  name={
                    visibleConfirmPassword ? 'eye-outline' : 'eye-off-outline'
                  }
                  size={24}
                  color={colors.gray[400]}
                />
              ),
              onPress: () => setVisibleConfirmPassword(!visibleConfirmPassword),
            }}
          />
        )}
      />
    </VStack>
  )
}

export default memo(SignUpFirstScreen)
