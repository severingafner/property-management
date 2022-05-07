const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Person',
    },
    rentObject: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'RentObject',
    },
    payments: [
      {
        amount: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
contractSchema.plugin(toJSON);
contractSchema.plugin(paginate);

/**
 * @typedef Contract
 */
const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;
