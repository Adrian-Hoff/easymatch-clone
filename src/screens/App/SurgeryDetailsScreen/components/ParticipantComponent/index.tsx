import { Box, IBoxProps, Text, useTheme } from 'native-base'

export interface ParticipantProps extends IBoxProps {
  name: string
}

export default function ParticipantComponent({
  name,
  ...props
}: ParticipantProps) {
  const { colors, fonts, fontSizes, radii } = useTheme()

  return (
    <Box
      p={5}
      bgColor={colors.gray[100]}
      borderColor={colors.gray[300]}
      borderWidth={0.5}
      borderRadius={radii.xl}
      {...props}
    >
      <Text
        color={colors.primary[400]}
        fontFamily={fonts.body}
        fontSize={fontSizes.md}
      >
        {name}
      </Text>
    </Box>
  )
}
