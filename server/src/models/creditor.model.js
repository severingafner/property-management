const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
    phonenumbers: [
      {
        number: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
      },
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
    },
  },
  {
    timestamps: true,
  }
);
creditorSchema.plugin(toJSON);
creditorSchema.plugin(paginate);

/**
 * @typedef Creditor
 */
const Creditor = mongoose.model('Creditor', creditorSchema);

module.exports = Creditor;
