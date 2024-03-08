import { memo } from 'react'
import { Box, Text, VStack, useTheme } from 'native-base'
import { AntDesign } from '@expo/vector-icons'

interface AuthHeaderProps {
  title: string
  subtitle: string
  navigateBack: () => void
}

function AuthHeaderComponent({
  title,
  subtitle,
  navigateBack,
}: AuthHeaderProps) {
  const { colors } = useTheme()

  return (
    <VStack space={2} pt={8} w={'100%'}>
      <Box pb={8} onTouchEnd={navigateBack}>
        <AntDesign name={'arrowleft'} size={24} color={colors.primary[400]} />
      </Box>
      <Text fontSize={'3xl'} fontFamily={'semiBold'} color={'gray.800'}>
        {title}
      </Text>
      <Text fontSize={'md'} fontFamily={'mono'} color={'gray.800'}>
        {subtitle}
      </Text>
    </VStack>
  )
}

export default memo(AuthHeaderComponent)
