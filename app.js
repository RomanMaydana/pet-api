import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createPetsRouter } from './routes/pets.js'
import { PetsModel } from './models/local-file-system/pets.js'

const app = express()

app.use(corsMiddleware())
app.use(express.json())

app.use('/pets', createPetsRouter({ petsModel: PetsModel }))

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
