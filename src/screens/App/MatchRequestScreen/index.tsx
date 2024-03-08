import { useEffect, useState } from 'react'
import { Box, HStack, Text, VStack, useTheme } from 'native-base'
import { onSnapshot, query, collection } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { db } from '@config/firebase'
import StackHeaderAppComponent from '@components/StackHeaderAppComponent'
import ButtonComponent from '@components/ButtonComponent'
import { useSurgery } from '@hooks/useSurgery'
import { IMatchRequest } from '@interfaces/App/IMatchRequest'
import { AppNavigatorRoutesProps } from '@routes/AppRoutes'
import InfoBlockComponent from '../SurgeryDetailsScreen/components/InfoBlockComponent'
import { IUser } from '@interfaces/Auth/IUser'

interface MatchRequestProps {
  route: { params: IMatchRequest }
}

export default function MatchRequestScreen({ route }: MatchRequestProps) {
  const { fontSizes, fonts } = useTheme()
  const { setParticipantsAssistants, setPendingAssistants } = useSurgery()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const [assistant, setAssistant] = useState<IUser>({} as IUser)
  const {
    name,
    areasOfExpertise,
    date,
    place,
    surgeryId,
    time,
    pendingAssistants,
    participantsAssistants,
    assistantId,
  } = route.params

  useEffect(() => {
    onSnapshot(query(collection(db, 'users')), ({ docs }) => {
      docs.forEach((doc) => {
        if (doc.id === assistantId) {
          setAssistant({ ...(doc.data() as IUser), userId: doc.id })
        }
      })
    })
  }, [assistantId])

  async function handleMatchAccepted() {
    participantsAssistants.push(assistantId as string)
    await setParticipantsAssistants(surgeryId, participantsAssistants)

    const index = pendingAssistants.indexOf(assistantId as string)
    pendingAssistants.splice(index, 1)
    await setPendingAssistants(surgeryId, pendingAssistants)

    navigate('surgeryDetails', route.params)
  }

  async function handleMatchRejected() {
    const index = pendingAssistants.indexOf(assistantId as string)
    pendingAssistants.splice(index, 1)
    await setPendingAssistants(surgeryId, pendingAssistants)

    navigate('surgeryDetails', route.params)
  }

  return (
    <Box flex={1} pb={10}>
      <StackHeaderAppComponent
        title="Solicitação de Match"
        canGoBack
        goBackTo={() => navigate('surgeryDetails', route.params)}
        fontSize={fontSizes.lg}
      />
      <VStack space={10} flex={1} px={6} pt={10}>
        <VStack space={8}>
          <InfoBlockComponent label="Nome da cirugia" content={name} />
          <HStack space={4}>
            <InfoBlockComponent
              flex={1}
              label="Área"
              content={areasOfExpertise}
            />
            <InfoBlockComponent
              flex={1}
              label="Data"
              content={date as string}
            />
          </HStack>
          <HStack space={4}>
            <InfoBlockComponent
              flex={1}
              label="Horário"
              content={time as string}
            />
            <InfoBlockComponent flex={1} label="Local" content={place} />
          </HStack>
        </VStack>

        <VStack space={6} flex={1}>
          <Text fontSize={fontSizes.lg} fontFamily={fonts.semiBold}>
            Solicitante
          </Text>
          <VStack space={8} flex={1}>
            <InfoBlockComponent
              label="Nome do assistente"
              content={assistant.name}
            />
            <HStack space={4}>
              <InfoBlockComponent
                flex={1.5}
                label="Área do assistente"
                content={assistant.areasOfExpertise}
              />
              <InfoBlockComponent
                flex={1}
                label="Convênios"
                content={assistant.agreements}
              />
            </HStack>
          </VStack>
        </VStack>

        <HStack space={4}>
          <ButtonComponent
            title="Recusar"
            variant="outline"
            flex={1}
            onPress={handleMatchRejected}
          />
          <ButtonComponent
            title="Aceitar"
            flex={1}
            onPress={handleMatchAccepted}
          />
        </HStack>
      </VStack>
    </Box>
  )
}
