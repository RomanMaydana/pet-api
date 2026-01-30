import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createPetsRouter } from './routes/pets.js'
import { PetsModel } from './models/postgresql/pets.model.js'
import { PORT } from './config.js'
import { errorHandlerMiddleware } from './middlewares/error.js'

const app = express()

app.use(corsMiddleware())
app.use(express.json())

app.use('/pets', createPetsRouter({ petsModel: PetsModel }))

app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
