import z from 'zod'

const petSchema = z.object({
  name: z.string({
    invalid_type_error: 'Pet name must be a string',
    required_error: 'Pet name is required'
  }),
  species: z.enum(['dog', 'cat', 'rabbit', 'bird', 'other'], {
    invalid_type_error: 'Species must be one of dog, cat, rabbit, bird, other',
    required_error: 'Species is required'
  }),
  breed: z.string({
    invalid_type_error: 'Breed must be a string',
    required_error: 'Breed is required'
  }),
  age: z.coerce.number().int().min(0).max(99),
  age_unit: z.enum(['years', 'months'], {
    invalid_type_error: 'Age unit must be one of years, months',
    required_error: 'Age unit is required'
  }),
  size: z.enum(['small', 'medium', 'large'], {
    invalid_type_error: 'Size must be one of small, medium, large',
    required_error: 'Size is required'
  }),
  color: z.string({
    invalid_type_error: 'Color must be a string',
    required_error: 'Color is required'
  }),
  gender: z.enum(['male', 'female'], {
    invalid_type_error: 'Gender must be one of male, female',
    required_error: 'Gender is required'
  }),
  description: z.string({
    invalid_type_error: 'Description must be a string',
    required_error: 'Description is required'
  }),
  images: z.array(z.string(), {
    invalid_type_error: 'Images must be an array of strings',
    required_error: 'Images is required'
  }),
  categories: z.object({
    urgent: z.boolean(),
    friendly: z.boolean(),
    trained: z.boolean(),
    energy_level: z.enum(['low', 'medium', 'high'], {
      invalid_type_error: 'Energy level must be one of low, medium, high',
      required_error: 'Energy level is required'
    }),
    vaccinated: z.boolean(),
    neutered: z.boolean()
  }),
  location: z.string({
    invalid_type_error: 'Location must be a string',
    required_error: 'Location is required'
  })
})

export function validatePet (input) {
  return petSchema.safeParse(input)
}

export function validatePartialPet (input) {
  return petSchema.partial().safeParse(input)
}
