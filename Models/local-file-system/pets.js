import pets from '../../pets.json' with { type: 'json' }
import crypto from 'node:crypto'
import { AgeUnit, PetAges } from '../../type.d.js'
export class PetsModel {
  static async getAll ({ species, age, gender, actions }) {
    let filteredPets = [...pets]
    if(species) {
      filteredPets = filteredPets.filter(pet => species.includes(pet.species))
    }
    if(age != null) {
      filteredPets = filteredPets.filter(pet => {
        if(age === 0) {
          return pet.age_unit === AgeUnit.MONTHS || pet.age <= PetAges[age][1]
        } else {
          return pet.age_unit === AgeUnit.YEARS && PetAges[age][0] <= pet.age && pet.age <= PetAges[age][1]
        }
      })
    }
    if(gender){
      filteredPets = filteredPets.filter(pet => pet.gender.toLowerCase() === gender)
    }
    if(actions){
      filteredPets = filteredPets.filter(pet => pet.categories[actions])
    }
    return filteredPets
  }

  static async getById ({ id }) {
    return pets.find(pet => pet.id === id)
  }

  static async create ({ input }) {
    const uuid = crypto.randomUUID()
    const newPet = {
      id: uuid,
      ...input,
      created_at: new Date().toISOString()
    }
    pets.push(newPet)
    return newPet
  }

  static async update ({ id, input }) {
    const petIndex = pets.findIndex(pet => pet.id === id)
    if (petIndex === -1) {
      return null
    }
    pets[petIndex] = { ...pets[petIndex], ...input }
    return pets[petIndex]
  }

  static async delete ({ id }) {
    return {}
  }
}
