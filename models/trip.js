const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: [
        {
            name: {
                type: String
            },
            money: {
                type: Number
            }
        }
    ]
}, {timestamps: true});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;