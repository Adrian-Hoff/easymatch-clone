import { useEffect, useState } from 'react'
import { Box, FlatList, HStack, Text, useTheme, VStack } from 'native-base'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { db } from '@config/firebase'
import ButtonComponent from '@components/ButtonComponent'
import ModalSureComponent from '@components/ModalSureComponent'
import { useAuth } from '@hooks/useAuth'
import { useSurgery } from '@hooks/useSurgery'
import { AppNavigatorRoutesProps } from '@routes/AppRoutes'
import { SurgeryDetailsProps } from '@routes/AppRoutes/SurgeryDetailsRoutes'
import InfoBlockComponent from '../components/InfoBlockComponent'
import ParticipantComponent from '../components/ParticipantComponent'
import { IUser } from '@interfaces/Auth/IUser'

export default function SurgeryDetailsInfoScreen({
  route,
}: SurgeryDetailsProps) {
  const { colors, fontSizes, fonts } = useTheme()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { user, occupation } = useAuth()
  const { deleteSurgery, setPendingAssistants, setParticipantsAssistants } =
    useSurgery()
  const [showModalSureCancel, setShowModalSureCancel] = useState<boolean>(false)
  const [showModalSureSignOut, setShowModalSureSignOut] =
    useState<boolean>(false)
  const [isParticipant, setIsParticipant] = useState<boolean>(false)
  const [alreadyRegistered, setAlreadyRegistered] = useState<boolean>(false)
  const [participantsAssistantsList, setParticipantsAssistantsList] = useState<
    IUser[]
  >([])
  const {
    name,
    date,
    place,
    time,
    surgeryId,
    authorId,
    authorName,
    areasOfExpertise,
    participantsAssistants,
    pendingAssistants,
  } = route.params

  useEffect(() => {
    setIsParticipant(participantsAssistants.includes(user?.uid as string))
  }, [participantsAssistants, user?.uid])

  useEffect(() => {
    setAlreadyRegistered(pendingAssistants.length !== 0)
  }, [pendingAssistants.length])

  useEffect(() => {
    onSnapshot(query(collection(db, 'users')), ({ docs }) => {
      const participantsAssistantsAux: IUser[] = []
      docs.forEach((doc) => {
        if (participantsAssistants?.includes(doc.id)) {
          participantsAssistantsAux.push({
            ...(doc.data() as IUser),
            userId: doc.id,
          })
        }
      })
      setParticipantsAssistantsList(participantsAssistantsAux)
    })
  }, [participantsAssistants])

  async function handleDeleteSurgery() {
    await deleteSurgery(surgeryId)
    setShowModalSureCancel(false)
    navigate('surgeries')
  }

  function handleRegisterAssistant() {
    pendingAssistants.push(user?.uid as string)
    setPendingAssistants(surgeryId, pendingAssistants)
  }

  async function handleUnsubscribeAssistant() {
    const index = participantsAssistants.indexOf(user?.uid as string)
    participantsAssistants.splice(index, 1)

    await setParticipantsAssistants(surgeryId, participantsAssistants)
    setShowModalSureCancel(false)
  }

  return (
    <Box flex={1} p={6}>
      <ModalSureComponent
        isOpen={showModalSureCancel}
        onClose={() => setShowModalSureCancel(false)}
        message="Tem certeza que deseja cancelar essa cirurgia?"
        confirmButtonAction={handleDeleteSurgery}
      />
      <ModalSureComponent
        isOpen={showModalSureSignOut}
        onClose={() => setShowModalSureSignOut(false)}
        message="Tem certeza que deseja sair essa cirurgia?"
        confirmButtonAction={handleUnsubscribeAssistant}
      />
      <VStack space={8} flex={1}>
        <HStack alignItems="center" justifyContent="space-between">
          <Text
            color={colors.primary[400]}
            fontSize={fontSizes.xl}
            fontFamily={fonts.semiBold}
          >
            {name}
          </Text>
          <Text
            color={colors.gray[500]}
            fontFamily={fonts.mono}
            fontSize={fontSizes.md}
          >
            {date as string}
          </Text>
        </HStack>
        <HStack space={4}>
          <InfoBlockComponent flex={1} label="Local" content={place} />
          <InfoBlockComponent
            flex={1}
            label="Horário"
            content={time as string}
          />
        </HStack>
      </VStack>

      {occupation === 'surgeon' ? (
        <VStack space={3} flex={2}>
          <Text
            color={colors.primary[400]}
            fontFamily={fonts.body}
            fontSize={fontSizes.md}
          >
            Participantes
          </Text>
          {participantsAssistants.length === 0 ? (
            <Box flex={1} alignItems={'center'} justifyContent={'center'}>
              <Text color={colors.gray[500]}>Nenhum participante</Text>
            </Box>
          ) : (
            <FlatList
              data={participantsAssistantsList}
              _contentContainerStyle={{
                flexGrow: 1,
              }}
              ItemSeparatorComponent={() => <Box mt={2} />}
              renderItem={({ item }) => (
                <ParticipantComponent key={item.userId} name={item.name} />
              )}
            />
          )}
        </VStack>
      ) : (
        <HStack space={4} flex={2.5}>
          <InfoBlockComponent flex={1} label="Cirurgião" content={authorName} />
          <InfoBlockComponent
            flex={1}
            label="Área"
            content={areasOfExpertise}
          />
        </HStack>
      )}
      <VStack space={3} pt={8}>
        {authorId === user?.uid ? (
          <>
            <ButtonComponent title="Editar" isDisabled />
            <ButtonComponent
              title="Cancelar"
              variant="outline"
              onPress={() => setShowModalSureCancel(!showModalSureCancel)}
            />
          </>
        ) : (
          <>
            {isParticipant ? (
              <ButtonComponent
                title="Sair"
                variant="outline"
                onPress={() => setShowModalSureSignOut(!showModalSureSignOut)}
              />
            ) : (
              <ButtonComponent
                title={
                  alreadyRegistered ? 'Solicitação enviada' : 'Candidatar-se'
                }
                isDisabled={alreadyRegistered}
                onPress={handleRegisterAssistant}
              />
            )}
          </>
        )}
      </VStack>
    </Box>
  )
}
