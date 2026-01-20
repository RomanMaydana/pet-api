import z from 'zod'

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
  actions: z.enum(['urgent', 'vaccinated'])
})

export function validatePartialFilters (object) {
  return filtersSchema.partial().safeParse(object)
}
