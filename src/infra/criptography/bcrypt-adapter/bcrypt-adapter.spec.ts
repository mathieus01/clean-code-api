import { BcryptAdapter } from './bcrypt-adapter'
import { throwError } from '@/domain/test'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hash')
  },
  async compare (): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Brypt Adapter', () => {
  describe('hash()', () => {
    test('should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })
    test('should return a valid hash on hash success', async () => {
      const sut = makeSut()
      const hash = await sut.hash('any_value')
      expect(hash).toBe('hash')
    })
    test('should throws if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    test('should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })
    test('should return true when compare succeeds', async () => {
      const sut = makeSut()
      const isvalid = await sut.compare('any_value', 'any_hash')
      expect(isvalid).toBe(true)
    })
    test('should return true when compare succeeds', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))
      const isvalid = await sut.compare('any_value', 'any_hash')
      expect(isvalid).toBe(false)
    })
    test('should throws if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
