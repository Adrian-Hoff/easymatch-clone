import {
  ISelectProps,
  Select,
  FormControl,
  useTheme,
  WarningOutlineIcon,
} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ISelectItem } from '@interfaces/ISelectItem'

interface SelectProps extends ISelectProps {
  items: ISelectItem[]
  errorMessage?: string | null
  isInvalid?: boolean
}

function SelectComponent({
  errorMessage,
  isInvalid,
  items,
  ...props
}: SelectProps) {
  const { colors, fonts, fontSizes, radii } = useTheme()
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} isReadOnly>
      <Select
        px={6}
        py={4}
        color={colors.text[400]}
        borderColor={colors.gray[300]}
        borderWidth={1}
        borderRadius={radii.lg}
        fontSize={fontSizes.md}
        fontFamily={fonts.mono}
        placeholderTextColor={colors.dark[500]}
        dropdownIcon={
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color={colors.gray[400]}
            paddingHorizontal={12}
          />
        }
        _actionSheetContent={{
          px: 0,
        }}
        {...props}
      >
        {items.map(({ label, value }) => (
          <Select.Item
            key={value}
            label={label}
            value={value}
            _pressed={{
              bgColor: colors.gray[300],
            }}
            px={6}
          />
        ))}
      </Select>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}

export default SelectComponent
