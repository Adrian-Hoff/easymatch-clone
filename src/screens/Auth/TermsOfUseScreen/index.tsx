import { memo } from 'react'
import { Box, ScrollView, Text, VStack, useTheme } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import TermsOfUse from '@assets/mocks/TermsOfUse'
import { AuthNavigatorRoutesProps } from '@routes/AuthRoutes'
import AuthHeaderComponent from '../components/AuthHeaderComponent'

function TermsOfUseScreen() {
  const { colors, fonts, fontSizes } = useTheme()
  const { goBack } = useNavigation<AuthNavigatorRoutesProps>()

  return (
    <ScrollView
      px={6}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack space={10}>
        <AuthHeaderComponent
          title="Termos De Uso"
          subtitle={`Leia os termos de uso abaixo.
            Você deve seguir os termos de uso e normas estabelecidas`}
          navigateBack={goBack}
        />
        <Box pb={10}>
          <Text
            color={colors.text[400]}
            fontFamily={fonts.mono}
            fontSize={fontSizes.sm}
            textAlign="justify"
          >
            {TermsOfUse}
          </Text>
        </Box>
      </VStack>
    </ScrollView>
  )
}

export default memo(TermsOfUseScreen)
