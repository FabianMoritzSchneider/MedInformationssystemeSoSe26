import mongoose from 'mongoose'

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/medinfo'

export const connectMongo = async () => {
  const connection = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000
  })
  console.log(`MongoDB connected: ${connection.connection.host}`)
  return connection
}

export const closeMongo = async () => {
  if (mongoose.connection.readyState) {
    await mongoose.disconnect()
    console.log('MongoDB disconnected')
  }
}
