import { Box, Text, Toast } from 'native-base'

interface ToastProps {
  type: 'success' | 'warning' | 'error'
  message: string
}

export default function ToastComponent({ type, message }: ToastProps) {
  const id = 'test-toast'

  if (!Toast.isActive(id)) {
    Toast.show({
      id,
      placement: 'top',
      render: () => {
        return (
          <Box
            bgColor={
              type === 'error'
                ? 'red.500'
                : type === 'warning'
                ? 'yellow.500'
                : 'emerald.500'
            }
            p={2}
            borderRadius={'md'}
          >
            <Text color="light.100" fontSize="md" fontFamily="mono">
              {message}
            </Text>
          </Box>
        )
      },
    })
  }
}
