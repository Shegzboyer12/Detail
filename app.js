const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

  const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  });
  
  const Person = mongoose.model('Person', personSchema);

  const createAndSavePerson = (done) => {
    const person = new Person({
      name: "John Doe",
      age: 30,
      favoriteFoods: ["Pizza", "Pasta"]
    });
  
    person.save((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };

  const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, people) => {
      if (err) return console.error(err);
      done(null, people);
    });
  };

  const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, people) => {
      if (err) return console.error(err);
      done(null, people);
    });
  };
  const findPersonById = (personId, done) => {
    Person.findById(personId, (err, person) => {
      if (err) return console.error(err);
      done(null, person);
    });
  };
  const findEditThenSave = (personId, done) => {
    Person.findById(personId, (err, person) => {
      if (err) return console.error(err);
  
      person.favoriteFoods.push("hamburger");
      person.save((err, updatedPerson) => {
        if (err) return console.error(err);
        done(null, updatedPerson);
      });
    });
  };

  const queryChain = (done) => {
    Person.find({ favoriteFoods: "burritos" })
      .sort("name")
      .limit(2)
      .select("-age")
      .exec((err, data) => {
        if (err) return console.error(err);
        done(null, data);
      });
  };
  