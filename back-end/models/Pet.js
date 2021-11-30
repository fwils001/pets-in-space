const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    }, 
    about: {
        type: String,
        default: 'Best Pet Ever!'
    },
    image: {
        type: String,
        default: "https://imgur.com/ZBGAJI6.jpg"
    }
});



const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;