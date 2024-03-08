import { useContext } from 'react'
import { SurgeryContext } from '@contexts/SurgeryContext'

export function useSurgery() {
  const context = useContext(SurgeryContext)

  return context
}
