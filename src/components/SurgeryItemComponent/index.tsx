import {
  HStack,
  Text,
  VStack,
  useTheme,
  Pressable,
  IPressableProps,
} from 'native-base'

export interface SurgeryItemComponentProps extends IPressableProps {
  name: string
  place: string
  date: string
  time: string
}

export default function SurgeryItemComponent({
  name,
  place,
  date,
  time,
  ...props
}: SurgeryItemComponentProps) {
  const { colors, fonts, fontSizes, radii } = useTheme()

  return (
    <Pressable {...props}>
      <HStack
        flex={1}
        space={6}
        px={4}
        py={2}
        borderRadius={radii.lg}
        borderColor={colors.gray[500]}
        borderWidth={0.25}
      >
        <VStack flex={1}>
          <Text
            color={colors.gray[700]}
            fontFamily={fonts.semiBold}
            fontSize={fontSizes.lg}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text
            color={colors.gray[600]}
            fontFamily={fonts.mono}
            fontSize={fontSizes.sm}
            numberOfLines={1}
          >
            {place}
          </Text>
          <Text
            color={colors.gray[600]}
            fontFamily={fonts.mono}
            fontSize={fontSizes.sm}
            numberOfLines={1}
          >
            {date} - {time}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  )
}
