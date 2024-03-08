import { memo } from 'react'
import { IModalProps, Modal, Text, useTheme } from 'native-base'
import ButtonComponent from '@components/ButtonComponent'

interface ModalSureProps extends IModalProps {
  message: string
  confirmButtonAction: () => void
}

function ModalSureComponent({
  message,
  confirmButtonAction,
  onClose,
  ...props
}: ModalSureProps) {
  const { colors, fonts, fontSizes, radii } = useTheme()

  return (
    <Modal onClose={onClose} {...props}>
      <Modal.Content borderRadius={radii.xl} p={2}>
        <Modal.Body>
          <Text
            color={colors.primary[400]}
            fontFamily={fonts.mono}
            fontSize={fontSizes.md}
          >
            {message}
          </Text>
        </Modal.Body>
        <Modal.Footer
          borderTopWidth={0}
          alignItems="center"
          justifyContent="space-around"
        >
          <ButtonComponent
            title="Cancelar"
            onTouchEnd={onClose}
            variant="outline"
          />
          <ButtonComponent title="Confirmar" onTouchEnd={confirmButtonAction} />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default memo(ModalSureComponent)
