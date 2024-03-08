import { memo } from 'react'
import { Button, IButtonProps, Text, ITextProps, useTheme } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  variant?: 'solid' | 'outline'
}

function ButtonComponent({
  title,
  variant = 'solid',
  ...props
}: ButtonProps & ITextProps) {
  const { colors, fonts, fontSizes, radii } = useTheme()

  return (
    <Button
      py={3}
      borderColor={
        variant === 'outline' ? colors.gray[300] : colors.primary[400]
      }
      bgColor={variant === 'outline' ? 'transparent' : colors.primary[400]}
      borderWidth={1}
      borderRadius={radii.lg}
      _pressed={{
        bgColor:
          variant === 'outline' ? colors.light[200] : colors.primary[300],
      }}
      {...props}
    >
      <Text
        color={variant === 'outline' ? colors.primary[400] : colors.light[50]}
        fontFamily={fonts.body}
        fontSize={fontSizes.md}
      >
        {title}
      </Text>
    </Button>
  )
}

export default memo(ButtonComponent)
