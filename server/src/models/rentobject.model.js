const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const rentObjectSchema = mongoose.Schema(
  {
    position: {
      type: String,
      trim: true,
    },
    area: {
      type: Number,
      required: false,
    },
    type: {
      type: String,
      enum: ['apartment', 'cellar', 'garage', 'parkinglot'],
      default: 'active',
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
    keys: [
      {
        description: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
rentObjectSchema.plugin(toJSON);

/**
 * @typedef RentObject
 */
const RentObject = mongoose.model('RentObject', rentObjectSchema);

/**
 * @typedef Apartment
 */
const Apartment = RentObject.discriminator(
  'Apartment',
  new mongoose.Schema({
    hatRefrigerator: Boolean,
    hasDishwasher: Boolean,
    hasStove: Boolean,
    hasOven: Boolean,
    hasWashingMachine: Boolean,
    hasTumbler: Boolean,
  })
);

module.exports = {
  RentObject,
  Apartment,
};
