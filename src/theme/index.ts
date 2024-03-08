import { extendTheme } from 'native-base'

const theme = extendTheme({
  colors: {
    primary: {
      '200': '#00000099',
      '300': '#000000cc',
      '400': '#000',
    },
    text: {
      '100': '#aaa',
      '400': '#585858',
    },
    dark: {
      '100': '#2b2b2b',
      '200': '#38383c',
    },
  },
  fonts: {
    heading: 'Poppins_700Bold',
    semiBold: 'Poppins_600SemiBold',
    body: 'Poppins_500Medium',
    mono: 'Poppins_400Regular',
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
})

export default theme
