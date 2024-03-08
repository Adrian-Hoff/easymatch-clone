import { memo } from 'react'
import { Platform } from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Box, Button, Text, useTheme } from 'native-base'

interface DatePickerProps {
  value: Date | string
  onChangeDate: (event: DateTimePickerEvent, date?: Date | undefined) => void
  mode: 'date' | 'time'
  placeholder?: string
  show: boolean
}

function DatePickerComponent({
  value,
  onChangeDate,
  mode,
  placeholder,
  show,
}: DatePickerProps) {
  const { colors, fonts, fontSizes, radii } = useTheme()

  function handleShowDateTimePicker() {
    return show ? (
      <DateTimePicker
        testID="dateTimePicker"
        value={value as Date}
        mode={mode}
        is24Hour
        onChange={onChangeDate}
        minimumDate={new Date()}
      />
    ) : null
  }

  function handleDateTimePickerOS() {
    return Platform.OS === 'android' ? (
      <Box>
        {handleShowDateTimePicker()}
        <Button
          w="100%"
          minH={16}
          px={6}
          borderColor={colors.gray[300]}
          borderWidth={1}
          borderRadius={radii.lg}
          justifyContent="flex-start"
          bgColor="transparent"
        >
          <Text
            color={colors.text[400]}
            fontSize={fontSizes.md}
            fontFamily={fonts.mono}
          >
            {placeholder}
          </Text>
        </Button>
      </Box>
    ) : (
      <DateTimePicker
        testID="dateTimePicker"
        value={value as Date}
        mode={mode}
        is24Hour={true}
        onChange={onChangeDate}
        minimumDate={new Date()}
      />
    )
  }

  return handleDateTimePickerOS()
}

export default memo(DatePickerComponent)
