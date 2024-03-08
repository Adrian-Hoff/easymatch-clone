import { memo } from 'react'
import {
  FormControl,
  IInputProps,
  Input,
  Pressable,
  useTheme,
  WarningOutlineIcon,
} from 'native-base'

interface InputProps extends IInputProps {
  errorMessage?: string | null
  iconRight?: { element: JSX.Element; onPress: () => void }
}

function InputComponent({
  errorMessage = null,
  iconRight,
  isInvalid,
  ...props
}: InputProps) {
  const { colors, fonts, fontSizes, radii } = useTheme()
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid}>
      <Input
        px={6}
        py={4}
        color={colors.text[400]}
        borderColor={colors.gray[300]}
        borderWidth={1}
        borderRadius={radii.lg}
        fontSize={fontSizes.md}
        fontFamily={fonts.mono}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={colors.dark[500]}
        InputRightElement={
          <Pressable onPress={iconRight?.onPress} px={6}>
            {iconRight?.element}
          </Pressable>
        }
        isInvalid={invalid}
        _focus={{
          bgColor: 'transparent',
          borderColor: colors.primary[200],
          borderWidth: 1,
        }}
        _invalid={{
          borderColor: colors.red[600],
          borderWidth: 1,
        }}
        {...props}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}

export default memo(InputComponent)
