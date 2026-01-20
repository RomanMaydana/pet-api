import { validatePartialFilters } from '../schemas/filters.js'
import { getFieldErrors } from '../utils.js'

export class PetsController {
  constructor ({ petsModel }) {
    this.petsModel = petsModel
  }

  getAll = async (req, res) => {
    const result = validatePartialFilters(req.query)
    if (!result.success) {
      return res.status(400).json({ message: getFieldErrors(result.error) })
    }
    console.log(result.data)
    const pets = await this.petsModel.getAll(result.data)
    res.json(pets)
  }

  getById () {
    return {}
  }

  async create ({ input }) {
    return {}
  }

  async update ({ id, input }) {
    return {}
  }

  async delete () {
    return {}
  }
}
