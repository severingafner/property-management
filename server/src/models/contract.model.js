const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const contractSchema = mongoose.Schema(
{
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: false,
    },
    rent: {
        type: Number,
        required: true,
    },
    additionalCosts: {
        type: Number,
        required: true,
    },
    isFlatrate: {
        type: Boolean,
    },
    deposit: {
        type: Number,
        required: true,
    },
    tenant: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'Person' 
    },
    rentObject: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'RentObject' 
    },
    payments: [{
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }]
},
{
    timestamps: true,
  }
);
contractSchema.plugin(toJSON);

/**
 * @typedef Contract
 */
 const Contract = mongoose.model('Contract', contractSchema);

 module.exports = Contract;