const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Address schema
let Address = new Schema({
    street: {
        type: String
    },
    city: {
        type: String
    },
    postalCode: {
        type: Number
    },
    Country: {
        type: String
    }
}, {
    collection: 'addresses'
});

module.exports = mongoose.model('Address', Address);