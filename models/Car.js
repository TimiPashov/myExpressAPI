const { Schema, model } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const carSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    used: { type: Boolean, required: true },
    coupe: { type: String, required: true },
    fuelType: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: Types.ObjectId, ref: 'User' },
    images: [{ type: String, required: true, validate: { validator: (value) => URL_PATTERN.test(value), message: 'Invalid IMG URL' } }]
});

const Car = model('Car', carSchema);
module.exports = Car;