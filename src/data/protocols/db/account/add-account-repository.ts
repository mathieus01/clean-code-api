import { AddAccountModel } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'

export interface AddAccountRepository {
  add(accoutData: AddAccountModel): Promise<AccountModel>
}
