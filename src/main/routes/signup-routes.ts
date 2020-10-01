import { Router } from 'express'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter'

export default (route: Router): void => {
  route.post('/signup', adaptRoute(makeSignUpController()))
}
