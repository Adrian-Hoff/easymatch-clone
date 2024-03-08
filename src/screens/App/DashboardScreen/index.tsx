import { useEffect, useState } from 'react'
import { Box, FlatList, Flex, Text, VStack, useTheme } from 'native-base'
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
  or,
} from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { db } from '@config/firebase'
import SurgeryItemComponent from '@components/SurgeryItemComponent'
import { useAuth } from '@hooks/useAuth'
import { ISurgery } from '@interfaces/App/ISurgery'
import { AppNavigatorRoutesProps } from '@routes/AppRoutes'

export default function DashboardScreen() {
  const { colors, fonts, fontSizes, radii } = useTheme()
  const { user } = useAuth()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const [surgeries, setSurgeries] = useState<ISurgery[]>([])

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'surgeries'),
        or(
          where('authorId', '==', user?.uid),
          where('participantsAssistants', 'array-contains', user?.uid),
        ),
        limit(3),
      ),
      (querySnapshot) => {
        const surgeriesAux: ISurgery[] = []
        querySnapshot.forEach((doc) =>
          surgeriesAux.push({ ...(doc.data() as ISurgery) }),
        )
        setSurgeries(surgeriesAux)
      },
    )
  }, [user?.uid])

  return (
    <Box flex={1} px={6}>
      <Box flex={1}>
        <Text
          color={colors.text[600]}
          fontSize={fontSizes['3xl']}
          fontFamily={fonts.mono}
        >
          Olá,
        </Text>
        <Text
          color={colors.primary[400]}
          fontSize={fontSizes['3xl']}
          fontFamily={fonts.heading}
        >
          {user?.displayName}
        </Text>
      </Box>

      <VStack flex={2}>
        <Box borderRadius={radii.md}>
          <Text
            color={colors.primary[400]}
            fontSize={fontSizes.md}
            fontFamily={fonts.body}
          >
            Próximas cirurgias
          </Text>
        </Box>

        {surgeries.length > 0 ? (
          <FlatList
            data={surgeries}
            _contentContainerStyle={{
              flexGrow: 1,
              pb: 12,
              pt: 6,
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
                onTouchStart={() =>
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
        ) : (
          <Flex flex={1} alignItems="center" justifyContent="center">
            <Text
              color={colors.gray[500]}
              fontFamily={fonts.body}
              fontSize={fontSizes.sm}
            >
              Nenhuma cirurgia
            </Text>
          </Flex>
        )}
      </VStack>
    </Box>
  )
}
