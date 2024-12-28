const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false });

const Course = mongoose.model('Course', DataSchema, 'courses');
module.exports = Course;
