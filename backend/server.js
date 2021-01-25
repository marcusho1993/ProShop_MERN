import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// dotenv setup
dotenv.config()

// DB Connector
connectDB()

// Init express app
const app = express()

// Parse request body to JSON
app.use(express.json())

// Routes setup
app.get('/', (req, res) => {
	res.send('API is running')
})
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// Route ExceptionHandlers
app.use(notFound)
app.use(errorHandler)

// Connection Listener
const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV

app.listen(
	PORT,
	console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
)
