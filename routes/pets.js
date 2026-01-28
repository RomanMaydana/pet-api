import { PetsController } from '../controllers/pets.js'
import { Router } from 'express'
import { validatePartialPet, validatePet } from '../schemas/pet.js'
import { getFieldErrors } from '../utils.js'
// import { ACCEPTED_ORIGINS } from '../middlewares/cors.js'

export const createPetsRouter = ({ petsModel }) => {
  const petsController = new PetsController({ petsModel })
  const router = Router()

  function validateCreate (req, res, next) {
    const result = validatePet(req.body)
    if (!result.success) {
      return res.status(400)
        .json({ error: 'Invalid request', message: getFieldErrors(result.error) })
    }
    req.body = result.data
    next()
  }

  function validateUpdate (req, res, next) {
    const result = validatePartialPet(req.body)
    if (!result.success) {
      return res.status(400)
        .json({ error: 'Invalid request', message: getFieldErrors(result.error) })
    }
    req.body = result.data
    next()
  }

  router.get('/', petsController.getAll)
  router.get('/:id', petsController.getById)
  router.post('/', validateCreate, petsController.create)
  router.put('/:id', validateUpdate, petsController.update)
  router.delete('/:id', petsController.delete)

  // router.options('/:id', (req, res) => {
  //   const origin = req.header('Origin')
  //   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //     res.header('Access-Control-Allow-Origin', origin)
  //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  //   }
  //   res.send()
  // })
  return router
}
