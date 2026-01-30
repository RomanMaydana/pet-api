import z from 'zod'
import { DEFAULTS } from '../config.js'

const filtersSchema = z.object({
  species: z
    .preprocess((val) => {
      if (typeof val === 'string') return val.split(',')
      return val
    }, z.array(z.enum(['dog', 'cat', 'rabbit', 'bird', 'other'], {

      error: () => ({ message: 'Species must be one of dog, cat, rabbit, bird, other' })
    })))
    .optional(),
  age: z.coerce.number().int().min(0).max(4),
  gender: z.preprocess((val) => {
    if (typeof val === 'string') return val.toLowerCase()
    return val
  }, z.enum(['male', 'female'])),
  actions: z.enum(['urgent', 'vaccinated']),
  text: z.string().toLowerCase(),
  sortBy: z.enum(['latest', 'oldest']).optional(),
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z.number().int().min(0)
    )
    .default(DEFAULTS.LIMIT_OFFSET)
    .optional(),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z.number().int().min(1)
    )
    .default(DEFAULTS.LIMIT_PAGE)
    .optional()
})

export function validatePartialFilters (object) {
  return filtersSchema.partial().safeParse(object)
}
