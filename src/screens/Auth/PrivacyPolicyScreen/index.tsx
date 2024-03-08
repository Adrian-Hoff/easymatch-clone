import { memo } from 'react'
import { Box, ScrollView, Text, VStack, useTheme } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import PrivacyPolicy from '@assets/mocks/PrivacyPolicy'
import { AuthNavigatorRoutesProps } from '@routes/AuthRoutes'
import AuthHeaderComponent from '../components/AuthHeaderComponent'

function PrivacyPolicyScreen() {
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
          title="Política de privacidade"
          subtitle="Leia as políticas de privacidade abaixo. Fique tranquilo, nós prezamos pela segurança dos seus dados"
          navigateBack={() => goBack()}
        />
        <Box pb={10}>
          <Text
            color={colors.text[400]}
            fontFamily={fonts.mono}
            fontSize={fontSizes.sm}
            textAlign="justify"
          >
            {PrivacyPolicy}
          </Text>
        </Box>
      </VStack>
    </ScrollView>
  )
}

export default memo(PrivacyPolicyScreen)
