import { validatePartialFilters } from '../schemas/filters.js'
import { validatePartialPet, validatePet } from '../schemas/pet.js'
import { getFieldErrors } from '../utils.js'

export function validateCreate (req, res, next) {
  const result = validatePet(req.body)
  if (!result.success) {
    return res.status(400)
      .json({ error: 'Invalid request', message: getFieldErrors(result.error) })
  }
  req.body = result.data
  next()
}

export function validateUpdate (req, res, next) {
  const result = validatePartialPet(req.body)
  if (!result.success) {
    return res.status(400)
      .json({ error: 'Invalid request', message: getFieldErrors(result.error) })
  }
  req.body = result.data
  next()
}

export function validateFilters (req, res, next) {
  const result = validatePartialFilters(req.query)
  if (!result.success) {
    return res.status(400)
      .json({ error: 'Invalid request', message: getFieldErrors(result.error) })
  }
  req.body = result.data
  next()
}
