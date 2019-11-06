const mongoose = require('mongoose');
const slugify = require('slugify');

const geocoder = require('../utils/geocoder');

const BootcampSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more that 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add description'],
        trim: true,
        maxlength: [300, 'Description can not be more that 300 characters']
    },
    website: {
        type: String,
        match: [
            /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/,
            'Please use valid URL'
        ]
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 chaeracters']
    },
    email: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please use valid email'
        ]
    },
    adress: {
        type: String,
        // required: [true, 'Please enter address']
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            // required: true
        },
        coordinates: {
            type: [Number],
            // required: true,
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        zipcode: String,
        country: String
    },
    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Other',
            'Business'
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating can not be more than 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuaranty: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create bootcamp slug from the name
BootcampSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Geocode & create location field
BootcampSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.adress);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    };
    // Do not save adress in DB
    this.adress = undefined;
    next();
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);
