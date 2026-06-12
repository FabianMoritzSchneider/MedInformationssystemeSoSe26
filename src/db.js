import mongoose from 'mongoose'

const mongoUri = 'mongodb://127.0.0.1:27017/test'

export const connectMongo = async () => {
  const connection = await mongoose.connect(mongoUri)
  console.log(`MongoDB connected: ${connection.connection.host}`)
  return connection
}

export const closeMongo = async () => {
  await mongoose.disconnect()
}