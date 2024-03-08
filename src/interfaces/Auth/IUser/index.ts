import { ICreateUserOnFirebase } from '../ICreateUserOnFirebase'

export interface IUser extends ICreateUserOnFirebase {
  userId: string
}
