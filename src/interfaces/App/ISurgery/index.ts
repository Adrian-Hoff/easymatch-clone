export interface ISurgery {
  surgeryId: string
  name: string
  areasOfExpertise: string
  place: string
  date: Date | string
  time: Date | string
  authorId: string
  authorName: string
  participantsAssistants: string[]
  pendingAssistants: string[]
}
