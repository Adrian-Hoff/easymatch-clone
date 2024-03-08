import { createContext, useEffect, useState, ReactNode } from 'react'
import { onAuthStateChanged, User, UserCredential } from 'firebase/auth'
import {
  DocumentSnapshot,
  collection,
  onSnapshot,
  query,
} from 'firebase/firestore'
import { auth, db } from '@config/firebase'
import ToastComponent from '@components/ToastComponent'
import { ICreateUserOnFirebase } from '@interfaces/Auth/ICreateUserOnFirebase'
import * as api from '@services/auth'

interface AuthContextDataProps {
  loading: boolean
  signed: boolean
  user: User | null
  occupation: string | undefined
  signIn: (email: string, password: string) => Promise<UserCredential>
  signUp: (
    name: string,
    email: string,
    occupation: string,
    areasOfExpertise: string,
    agreements: string,
    password: string,
  ) => Promise<UserCredential>
  resetPassword: (email: string) => Promise<void>
  signOut: () => Promise<void>
  getUser: (userId: string) => Promise<User>
}

interface AuthContextProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

function AuthProvider({ children }: AuthContextProviderProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [occupation, setOccupation] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (user) {
      onSnapshot(query(collection(db, 'users')), ({ docs }) => {
        docs.forEach((doc) => {
          if (doc.id === user.uid) {
            setOccupation((doc.data() as ICreateUserOnFirebase).occupation)
          }
        })
      })
    }
  }, [user])

  useEffect(() => onAuthStateChanged(auth, (user) => setUser(user)), [])

  async function signIn(email: string, password: string) {
    setLoading(true)

    try {
      const response = await api.signIn(email, password)

      setLoading(false)

      return response
    } catch (error: any) {
      ToastComponent({
        type: 'error',
        message: 'Usuário ou senha incorretos',
      })

      setLoading(false)

      return error?.response
    }
  }

  async function signUp(
    name: string,
    email: string,
    occupation: string,
    areasOfExpertise: string,
    agreements: string,
    password: string,
  ) {
    setLoading(true)

    try {
      const response = await api.signUp(email, password)
      const { user } = response

      await api.addUserOnFirestore(user.uid, {
        name,
        email,
        occupation,
        areasOfExpertise,
        agreements,
      })
      await api.updateAccount(user, name, '')
      api.confirmAccount(user)

      setLoading(false)

      return response
    } catch (error: any) {
      ToastComponent({
        type: 'error',
        message: 'Erro ao fazer o cadastro',
      })

      setLoading(false)

      return error?.response
    }
  }

  async function resetPassword(email: string) {
    setLoading(true)

    try {
      const response = await api.resetPassword(email)

      ToastComponent({
        type: 'success',
        message: 'Link enviado para o e-mail',
      })

      setLoading(false)

      return response
    } catch (error: any) {
      ToastComponent({
        type: 'error',
        message: 'Usuário não encontrado',
      })

      setLoading(false)

      return error?.response
    }
  }

  async function signOut() {
    try {
      const response = await api.signOut()

      ToastComponent({
        type: 'success',
        message: 'Logout realizado com sucesso',
      })

      return response
    } catch (error: any) {
      ToastComponent({
        type: 'error',
        message: 'Erro ao fazer logout',
      })

      return error?.response
    }
  }

  async function getUser(userId: string) {
    setLoading(true)

    try {
      const response = await api.getUser(userId)

      setLoading(false)

      return response as DocumentSnapshot<User>
    } catch (error: any) {
      ToastComponent({
        type: 'error',
        message: 'Erro ao encontrar usuário',
      })

      setLoading(false)

      return error?.response
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        signed: !!user,
        user,
        occupation,
        signIn,
        signUp,
        resetPassword,
        signOut,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
