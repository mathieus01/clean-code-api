import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { makeLoginController } from '../factories/login/login-factory'

export default (route: Router): void => {
  route.post('/signup', adaptRoute(makeSignUpController()))
  route.post('/login', adaptRoute(makeLoginController()))
}
