const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const propertySchema = mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
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
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
    insurance: {
      type: String,
      trim: true,
    },
    janitor: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
propertySchema.plugin(toJSON);
propertySchema.plugin(paginate);

/**
 * @typedef Property
 */
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
