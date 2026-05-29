const mongoose = require('mongoose')

const kittySchema = new mongoose.Schema({
  name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);

const main = async () => {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/test')
    console.log('Connected ...')

    const silence = new Kitten({ name: 'Silence' });
    console.log(silence.name); // 'Silence'
}

try {
    main()
} catch (e) {
    console.log(e)
}