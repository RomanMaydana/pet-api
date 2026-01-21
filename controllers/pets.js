import { validatePartialFilters } from '../schemas/filters.js'
import { validatePet } from '../schemas/pet.js'
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
    const pets = await this.petsModel.getAll(result.data)
    res.json(pets)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const pet = await this.petsModel.getById({ id })
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' })
    }
    res.json(pet)
  }

  create = async (req, res) => {
    const result = validatePet(req.body)
    if (!result.success) {
      return res.status(400).json({ message: getFieldErrors(result.error) })
    }
    const pet = await this.petsModel.create({ input: result.data })
    if (!pet) {
      return res.status(400).json({ message: 'Pet not created' })
    }
    res.json(pet)
  }

  async update ({ id, input }) {
    return {}
  }

  async delete () {
    return {}
  }
}
