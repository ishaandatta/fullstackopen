const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.k7bvhui.mongodb.net/personApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)


if (process.argv.length == 5) {
  const arg3 = process.argv[3]
  const arg4 = process.argv[4]
  console.log(arg3, arg4)

  mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: arg3,
      number: arg4    
    })

    return person.save()
  })
  .then(() => {
    console.log(`added ${arg3} number ${arg4} to phonebook`)
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
}

else {
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected')
      return Person.find({}).then(person => {
        person.forEach(p => {
          console.log(p.name, p.number)
        })
        // const str = JSON.parse(person.name)
        // return console.log(str)
      })
    })
    .then(() => mongoose.connection.close())
    .catch((err) => console.log(err))
}
  