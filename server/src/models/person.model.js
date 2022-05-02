const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON } = require('./plugins');

const personSchema = mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
    },
    prename: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    iban: {
        type: String,
        required: false,
        trim: true,
    },
    phonenumbers: [
        {
            number: {
                type: String,
                required: true,
                trim: true,
            },
            description:{
                type: String,
                required: true,
                trim: true,
            },
        }
    ],
    contracts: [{
        type: Schema.Types.ObjectId, 
        ref: 'Contract' 
    }],
    street: {
        type: String,
        required: true,
        trim: true,
    },
    housenumber: {
        type: String,
        required: false,
        trim: true,
    },
    zip: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    }
},
{
    timestamps: true,
  }
);
personSchema.plugin(toJSON);

/**
 * @typedef Person
 */
 const Person = mongoose.model('Person', personSchema);

 module.exports = Person;