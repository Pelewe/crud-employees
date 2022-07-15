const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Skill schema
let Skill = new Schema({
    skillname: {
        type: String
    },
    yearsOfExperience: {
        type: Number
    },
    senoiorityRating: {
        type: String
    }
}, {
    collection: 'skills'
});

module.exports = mongoose.model('Skill', Skill);