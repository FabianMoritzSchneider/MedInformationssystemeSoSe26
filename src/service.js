import mongoose from 'mongoose'

import Patient1 from './schema/Patient1.schema.js'

const main = async () => {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/test')
    console.log('Connected...')
}

try {
    main()
} catch(e) {
    console.error(e)
}