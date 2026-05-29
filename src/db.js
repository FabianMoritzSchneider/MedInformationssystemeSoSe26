const mongoose = require('mongoose')

const kittySchema = new mongoose.Schema({
    name: String,
    age: Number,
    isCool: Boolean,
    favouriteTreats: [], // Altenativ: Array
    bestToy: {
        name: String,
        color: String
    },
    toys: [{ 
        name: String, 
        color: String 
    }] 
});

const Kitten = mongoose.model('Kitten', kittySchema)

const main = async () => {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/test')
    console.log('Connected ...')

    const silence = new Kitten({ name: 'Silence' })
    const r = await silence.save()
    console.log(r)
}

try {
    main()
} catch (e) {
    console.log(e)
}