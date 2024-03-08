import { memo } from 'react'
import { Text, useTheme, VStack } from 'native-base'
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'

interface InfoBlockProps extends IVStackProps {
  label: string
  content: string
}

function InfoBlockComponent({ label, content, ...props }: InfoBlockProps) {
  const { colors, fontSizes, fonts } = useTheme()

  return (
    <VStack space={1} {...props}>
      <Text
        color={colors.primary[400]}
        fontFamily={fonts.body}
        fontSize={fontSizes.md}
      >
        {label}
      </Text>
      <Text
        color={colors.gray[500]}
        fontFamily={fonts.mono}
        fontSize={fontSizes.md}
        noOfLines={1}
      >
        {content}
      </Text>
    </VStack>
  )
}

export default memo(InfoBlockComponent)
