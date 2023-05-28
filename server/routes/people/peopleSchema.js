const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name : String,
    dob : String,
    image : String,
    mobilenumber : String
})
const people = mongoose.model('people',Schema);
module.exports = people;
