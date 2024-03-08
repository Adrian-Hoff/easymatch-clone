import { memo } from 'react'
import { VStack } from 'native-base'
import { Control, Controller } from 'react-hook-form'
import SelectComponent from '@components/SelectComponent'
import { ISignUp } from '@interfaces/Auth/ISignUp'
import { areasOfExpertiseItems } from '@utils/areasOfExpertiseItems'
import { agreementsItems } from '@utils/agreementsItems'
import { occupationItems } from '@utils/occupationItems'

interface SignUpSecondFirstProps {
  control: Control<ISignUp>
}

function SignUpSecondScreen({ control }: SignUpSecondFirstProps) {
  return (
    <VStack space={3}>
      <Controller
        control={control}
        name="occupation"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <SelectComponent
            onValueChange={onChange}
            selectedValue={value}
            placeholder="Ocupação"
            items={occupationItems}
            errorMessage={errors.occupation?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="areasOfExpertise"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <SelectComponent
            onValueChange={onChange}
            selectedValue={value}
            placeholder="Áreas de atuação"
            items={areasOfExpertiseItems}
            errorMessage={errors.areasOfExpertise?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="agreements"
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <SelectComponent
            onValueChange={onChange}
            selectedValue={value}
            placeholder="Convênios"
            items={agreementsItems}
            errorMessage={errors.agreements?.message}
          />
        )}
      />
    </VStack>
  )
}

export default memo(SignUpSecondScreen)
