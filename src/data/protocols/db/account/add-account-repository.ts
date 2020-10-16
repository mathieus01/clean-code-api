import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'

export interface AddAccountRepository {
  add(accoutData: AddAccountParams): Promise<AccountModel>
}
