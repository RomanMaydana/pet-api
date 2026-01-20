import z from 'zod'

export const getFieldErrors = (error) => {
  return z.flattenError(error).fieldErrors
}
