import { HStack, Icon, IconButton, Text, VStack, useTheme } from 'native-base'
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

interface StackHeaderAppProps extends IVStackProps {
  title?: string
  subTitle?: string
  canGoBack?: boolean
  goBackTo?: () => void
  action?: 'NOTIFICATIONS' | 'NONE'
}

export default function StackHeaderAppComponent({
  title,
  subTitle,
  canGoBack = false,
  goBackTo,
  action = 'NONE',
  ...props
}: StackHeaderAppProps) {
  const { colors, fonts, fontSizes } = useTheme()

  return (
    <VStack space={2} py={6} px={canGoBack ? 4 : 6} {...props}>
      <HStack
        space={4}
        w="100%"
        alignItems="center"
        justifyContent={action !== 'NONE' ? 'space-between' : 'flex-start'}
      >
        {canGoBack ? (
          <IconButton
            icon={
              <Icon
                as={AntDesign}
                name="arrowleft"
                size={6}
                color={colors.primary[400]}
              />
            }
            borderRadius="full"
            _pressed={{
              bgColor: colors.gray[200],
            }}
            onTouchEnd={goBackTo}
          />
        ) : null}
        <Text
          flex={1}
          color={colors.primary[400]}
          fontSize={fontSizes['2xl']}
          fontFamily={fonts.semiBold}
          noOfLines={1}
        >
          {title}
        </Text>
        {action === 'NOTIFICATIONS' ? (
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="notifications-none"
                size={6}
                color={colors.primary[400]}
              />
            }
            borderRadius="full"
            _pressed={{
              bgColor: colors.gray[200],
            }}
          />
        ) : null}
      </HStack>
      {subTitle ? (
        <Text
          color={colors.gray[500]}
          fontSize={fontSizes.sm}
          fontFamily={fonts.body}
        >
          {subTitle}
        </Text>
      ) : null}
    </VStack>
  )
}
