const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const billSchema = mongoose.Schema(
{
    billingDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    grossAmount: {
        type: Number,
        required: true,
    },
    netAmount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['general', 'extra'],
        default: 'general',
    },
    creditor: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'Kreditor' 
    },
    rentObject: {
        type: Schema.Types.ObjectId, 
        ref: 'RentObject' 
    },
    property: {
        type: Schema.Types.ObjectId, 
        ref: 'Property' 
    },
},
{
    timestamps: true,
  }
);
billSchema.plugin(toJSON);

/**
 * @typedef Bill
 */
 const Bill = mongoose.model('Bill', billSchema);

 module.exports = Bill;