import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'
import { DocumentReference, DocumentSnapshot } from 'firebase/firestore'
import ToastComponent from '@components/ToastComponent'
import { ISurgery } from '@interfaces/App/ISurgery'
import * as api from '@services/app'

interface SurgeryContextDataProps {
  loading: boolean
  surgeries: ISurgery[]
  setSurgeries: Dispatch<SetStateAction<ISurgery[]>>
  addSurgery: (data: ISurgery) => Promise<DocumentReference<ISurgery>>
  deleteSurgery: (surgeryId: string) => Promise<void>
  setParticipantsAssistants: (
    surgeryId: string,
    data: string[],
  ) => Promise<void>
  setPendingAssistants: (surgeryId: string, data: string[]) => Promise<void>
  getSurgery: (surgeryId: string) => Promise<ISurgery>
}

interface SurgeryContextProviderProps {
  children: ReactNode
}

const SurgeryContext = createContext<SurgeryContextDataProps>(
  {} as SurgeryContextDataProps,
)

function SurgeryProvider({ children }: SurgeryContextProviderProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [surgeries, setSurgeries] = useState<ISurgery[]>([])

  async function addSurgery(data: ISurgery) {
    try {
      setLoading(true)

      const response = await api.addSurgery(data)

      ToastComponent({
        type: 'success',
        message: 'Cirurgia criada',
      })
      setLoading(false)

      return response as DocumentReference<ISurgery>
    } catch (error: any) {
      ToastComponent({
        type: 'error',
        message: 'Erro ao criar cirurgia',
      })
      setLoading(false)

      return error?.response
    }
  }

  async function deleteSurgery(surgeryId: string) {
    setLoading(true)

    try {
      const response = await api.deleteSurgery(surgeryId)

      ToastComponent({
        type: 'success',
        message: 'Cirurgia cancelada',
      })

      setLoading(false)

      return response as void
    } catch (error: any) {
      ToastComponent({
        type: 'error',
        message: 'Erro ao cancelar cirurgia',
      })

      setLoading(false)

      return error?.response
    }
  }

  async function setParticipantsAssistants(surgeryId: string, data: string[]) {
    setLoading(true)

    try {
      const response = await api.setParticipantsAssistants(surgeryId, data)

      setLoading(false)

      return response as void
    } catch (error: any) {
      setLoading(false)

      return error?.response
    }
  }

  async function setPendingAssistants(surgeryId: string, data: string[]) {
    setLoading(true)

    try {
      const response = await api.setPendingAssistants(surgeryId, data)

      setLoading(false)

      return response as void
    } catch (error: any) {
      setLoading(false)

      return error?.response
    }
  }

  async function getSurgery(surgeryId: string) {
    setLoading(true)

    try {
      const response = await api.getSurgery(surgeryId)

      setLoading(false)

      return response as DocumentSnapshot<ISurgery>
    } catch (error: any) {
      setLoading(false)

      return error?.response
    }
  }

  return (
    <SurgeryContext.Provider
      value={{
        loading,
        surgeries,
        setSurgeries,
        addSurgery,
        deleteSurgery,
        setParticipantsAssistants,
        setPendingAssistants,
        getSurgery,
      }}
    >
      {children}
    </SurgeryContext.Provider>
  )
}

export { SurgeryProvider, SurgeryContext }
