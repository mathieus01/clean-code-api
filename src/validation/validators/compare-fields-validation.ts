import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

export class CompareFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldNameToCompareName: string
  ) { }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldNameToCompareName]) {
      return new InvalidParamError(this.fieldNameToCompareName)
    }
  }
}
