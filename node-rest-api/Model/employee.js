const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Employee schema
let Employee = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    dob: {
        type: String
    },
    phone: {
        type: Number
    },
    address: { type: Schema.Types.ObjectId, ref: 'Address' },
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skills' }],
}, {
    collection: 'employees'
});

module.exports = mongoose.model('Employee', Employee);