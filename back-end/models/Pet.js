const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    about: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});



const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;