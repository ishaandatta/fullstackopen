const mongoose = require('mongoose')


const url = process.env.MONGODB_URI

console.log(`Connecting to ${url}`)

mongoose.connect(url)
    .then(result => console.log(`Connection succesful`))
    .catch(error => console.log(`error connecting to MongoDB`, error))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        unique: true,
        required: true
    },
    number: {
        type: String,
        minLength: 3,
        validate: {
            validator: function(v){
                return /^\d{2,3}-\d{6,}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number format`
        },
        required: true
    }
  })


  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
  })

 module.exports = mongoose.model('Person', personSchema)
