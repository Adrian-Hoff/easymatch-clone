import { useEffect, useState } from 'react'
import { Box, FlatList } from 'native-base'
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { db } from '@config/firebase'
import SurgeryItemComponent from '@components/SurgeryItemComponent'
import { useAuth } from '@hooks/useAuth'
import { ISurgery } from '@interfaces/App/ISurgery'
import { AppNavigatorRoutesProps } from '@routes/AppRoutes'

export default function MySurgeriesScreen() {
  const { user } = useAuth()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const [surgeries, setSurgeries] = useState<ISurgery[]>([])

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'surgeries'),
        orderBy('authorId'),
        orderBy('date', 'asc'),
        where('authorId', '==', user?.uid),
        limit(10),
      ),
      ({ docs }) => {
        const surgeriesAux: ISurgery[] = []
        docs.map((doc) =>
          surgeriesAux.push({
            ...(doc.data() as ISurgery),
            surgeryId: doc.id,
          }),
        )
        setSurgeries(surgeriesAux)
      },
    )
  }, [user?.uid])

  return (
    <FlatList
      data={surgeries}
      _contentContainerStyle={{
        flexGrow: 1,
        p: 6,
      }}
      ItemSeparatorComponent={() => <Box mt={3} />}
      renderItem={({
        item: {
          surgeryId,
          name,
          place,
          date,
          time,
          areasOfExpertise,
          authorId,
          authorName,
          participantsAssistants,
          pendingAssistants,
        },
        index,
      }) => (
        <SurgeryItemComponent
          key={index}
          name={name}
          place={place}
          date={date as string}
          time={time as string}
          onPress={() =>
            navigate('surgeryDetails', {
              surgeryId,
              name,
              place,
              date: date as string,
              time: time as string,
              areasOfExpertise,
              authorId,
              authorName,
              participantsAssistants,
              pendingAssistants,
            })
          }
        />
      )}
    />
  )
}
