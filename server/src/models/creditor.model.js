const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const creditorSchema = mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
    },
    taxnumber: {
        type: String,
        required: false,
        trim: true,
    },
    state: {
        type: String,
        enum: ['active', 'locked'],
        default: 'active',
    },
    contact: {
        type: Schema.Types.ObjectId, 
        ref: 'Person' 
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
creditorSchema.plugin(toJSON);

/**
 * @typedef Creditor
 */
 const Creditor = mongoose.model('Creditor', creditorSchema);

 module.exports = Creditor;