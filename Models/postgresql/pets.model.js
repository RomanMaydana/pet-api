import { pool } from './db.js'
// import crypto from 'node:crypto'
import { AgeUnit, PetAges } from '../../type.d.js'
export class PetsModel {
  static async getAll ({ text, species, age, gender, actions, sortBy, offset, limit }) {
    const where = []
    const queryParams = []
    if (text) {
      where.push(`name ILIKE $${queryParams.length + 1}`)
      queryParams.push(`%${text}%`)
    }
    if (species) {
      where.push(`species = ANY($${queryParams.length + 1})`)
      queryParams.push(species)
    }
    if (age != null) {
      if (age === 0) {
        where.push(`(age_unit = $${queryParams.length + 1} OR (age_unit = $${queryParams.length + 2} AND age BETWEEN $${queryParams.length + 3} AND $${queryParams.length + 4}))`)
        queryParams.push(AgeUnit.MONTHS)
        queryParams.push(AgeUnit.YEARS)
        queryParams.push(PetAges[age][0])
        queryParams.push(PetAges[age][1])
      } else {
        where.push(`age_unit = $${queryParams.length + 1} AND age BETWEEN $${queryParams.length + 2} AND $${queryParams.length + 3}`)
        queryParams.push(AgeUnit.YEARS)
        queryParams.push(PetAges[age][0])
        queryParams.push(PetAges[age][1])
      }
    }
    if (gender) {
      where.push(`gender = $${queryParams.length + 1}`)
      queryParams.push(gender)
    }
    if (actions) {
      const bdActionColum = `is_${actions}`
      where.push(`${bdActionColum} = $${queryParams.length + 1}`)
      queryParams.push(true)
    }
    const isAsc = sortBy === 'oldest'
    const query = `SELECT * FROM pets ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY created_at ${isAsc ? 'ASC' : 'DESC'} LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`
    const { rows: pets } = await pool.query(query, [...queryParams, limit, offset])
    return {
      data: pets,
      total: pets.length,
      offset,
      limit
    }
  }

  static async getById ({ id }) {
    const { rows: [pet] } = await pool.query('SELECT * FROM pets WHERE id = $1', [id])
    return pet
  }

  static async create ({ input }) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const { rows } = await client.query('INSERT INTO pets (name, species, breed, age, age_unit, size, color, gender, description, is_friendly, is_trained, is_vaccinated, is_neutered, energy_level, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *', [input.name, input.species, input.breed, input.age, input.age_unit, input.size, input.color, input.gender, input.description, input.is_friendly, input.is_trained, input.is_vaccinated, input.is_neutered, input.energy_level, input.location])
      const { images } = input
      if (images) {
        const imgValues = []
        const placeholders = images.map((url, index) => {
          const offset = index * 2
          imgValues.push(rows[0].id, url)
          return `($${offset + 1}, $${offset + 2}, ${index === 0})`
        }).join(', ')
        await client.query(`INSERT INTO pet_images (pet_id, image_url, is_primary) VALUES ${placeholders}`, imgValues)
      }
      await client.query('COMMIT')
      return {
        ...rows[0],
        images
      }
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }

  static async update ({ id, input }) {
    // const petIndex = pets.findIndex(pet => pet.id === id)
    // if (petIndex === -1) {
    //   return null
    // }
    // pets[petIndex] = { ...pets[petIndex], ...input }
    // return pets[petIndex]
  }

  static async delete ({ id }) {
    // const petIndex = pets.findIndex(pet => pet.id === id)
    // if (petIndex === -1) {
    //   return null
    // }
    // pets.splice(petIndex, 1)
    // return true
  }
}
