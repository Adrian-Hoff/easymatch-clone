import { useState } from 'react'
import { Platform } from 'react-native'
import { Box, HStack, VStack } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { zodResolver } from '@hookform/resolvers/zod'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import ButtonComponent from '@components/ButtonComponent'
import DatePickerComponent from '@components/DatePickerComponent'
import InputComponent from '@components/InputComponent'
import SelectComponent from '@components/SelectComponent'
import { useAuth } from '@hooks/useAuth'
import { useSurgery } from '@hooks/useSurgery'
import { ISurgery } from '@interfaces/App/ISurgery'
import { AppNavigatorRoutesProps } from '@routes/AppRoutes'
import { areasOfExpertiseItems } from '@utils/areasOfExpertiseItems'
import { addSurgerySchema } from '@utils/schemas'

export default function AddSurgeryScreen() {
  const { user } = useAuth()
  const { loading, addSurgery } = useSurgery()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const today = new Date()
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
    reset,
  } = useForm<ISurgery>({
    resolver: zodResolver(addSurgerySchema),
    mode: 'all',
    defaultValues: {
      date: today,
      time: today,
      participantsAssistants: [],
      pendingAssistants: [],
    },
  })
  const [showDate, setShowDate] = useState(false)
  const [showTime, setShowTime] = useState(false)

  async function handleAddSurgery() {
    await addSurgery({
      ...getValues(),
      date: (getValues('date') as Date).toLocaleDateString('pt-br'),
      time: (getValues('time') as Date).toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      authorId: user?.uid as string,
      authorName: user?.displayName as string,
      participantsAssistants: [],
      pendingAssistants: [],
    })

    navigate('surgeries')
    reset()
  }

  function onChangeDate(event: DateTimePickerEvent, date?: Date | undefined) {
    const currentDate = date
    if (Platform.OS === 'android') {
      setShowDate(false)
    }
    setValue('date', currentDate as Date)
  }

  function onChangeTime(event: DateTimePickerEvent, time?: Date | undefined) {
    const currentTime = time
    if (Platform.OS === 'android') {
      setShowTime(false)
    }
    setValue('time', currentTime as Date)
  }

  return (
    <VStack space={6} flex={1} p={6}>
      <VStack space={3}>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <InputComponent
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="areasOfExpertise"
          render={({ field: { value, onChange } }) => (
            <SelectComponent
              placeholder="Área"
              items={areasOfExpertiseItems}
              onValueChange={onChange}
              selectedValue={value}
              errorMessage={errors.areasOfExpertise?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="place"
          render={({ field: { value, onChange } }) => (
            <InputComponent
              placeholder="Local"
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              errorMessage={errors.place?.message}
            />
          )}
        />
      </VStack>
      <HStack space={3}>
        <Controller
          control={control}
          name="date"
          render={({ field: { value } }) => (
            <Box flex={1} onTouchEnd={() => setShowDate(true)}>
              <DatePickerComponent
                value={value as Date}
                mode={'date'}
                onChangeDate={onChangeDate}
                placeholder={(value as Date).toLocaleDateString('pt-br')}
                show={showDate}
              />
            </Box>
          )}
        />
        <Controller
          control={control}
          name="time"
          render={({ field: { value } }) => (
            <Box flex={1} onTouchEnd={() => setShowTime(true)}>
              <DatePickerComponent
                value={value as Date}
                mode={'time'}
                onChangeDate={onChangeTime}
                placeholder={(value as Date).toLocaleTimeString('pt-br', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                show={showTime}
              />
            </Box>
          )}
        />
      </HStack>
      <ButtonComponent
        isLoading={loading}
        onPress={handleSubmit(handleAddSurgery)}
        title="Adicionar"
      />
    </VStack>
  )
}
