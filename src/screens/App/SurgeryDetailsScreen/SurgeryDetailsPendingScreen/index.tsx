import { useEffect, useState } from 'react'
import { Box, FlatList, Text, VStack, useTheme } from 'native-base'
import { onSnapshot, query, collection } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { db } from '@config/firebase'
import { SurgeryDetailsProps } from '@routes/AppRoutes/SurgeryDetailsRoutes'
import ParticipantComponent from '../components/ParticipantComponent'
import { AppNavigatorRoutesProps } from '@routes/AppRoutes'
import { IUser } from '@interfaces/Auth/IUser'

export default function SurgeryDetailsPendingScreen({
  route,
}: SurgeryDetailsProps) {
  const { colors } = useTheme()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const [pendingAssistantsList, setPendingAssistantsList] = useState<IUser[]>(
    [],
  )
  const [assistantId, setAssistantId] = useState<string>('')
  const { pendingAssistants } = route.params

  useEffect(() => {
    onSnapshot(query(collection(db, 'users')), ({ docs }) => {
      const pendingAssistantsAux: IUser[] = []
      docs.forEach((doc) => {
        if (pendingAssistants?.includes(doc.id)) {
          pendingAssistantsAux.push({
            ...(doc.data() as IUser),
            userId: doc.id,
          })
          setAssistantId(doc.id)
        }
      })
      setPendingAssistantsList(pendingAssistantsAux)
    })
  }, [pendingAssistants])

  return (
    <Box flex={1} p={6}>
      {pendingAssistants.length === 0 ? (
        <VStack space={3} flex={1} alignItems="center" justifyContent="center">
          <Text color={colors.gray[500]}>Nenhum assistente</Text>
        </VStack>
      ) : (
        <FlatList
          data={pendingAssistantsList}
          _contentContainerStyle={{
            flexGrow: 1,
          }}
          ItemSeparatorComponent={() => <Box mt={2} />}
          renderItem={({ item }) => (
            <ParticipantComponent
              key={assistantId}
              name={item.name}
              onTouchEnd={() =>
                navigate('matchRequest', { ...route.params, assistantId })
              }
            />
          )}
        />
      )}
    </Box>
  )
}
