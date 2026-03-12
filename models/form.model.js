const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['text', 'dropdown', 'checkbox', 'radio'],
    },
    required: {
      type: Boolean,
      default: false,
    },
    options: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const FormSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    fields: {
      type: [FieldSchema],
      default: [],
      validate: [
        (value) => Array.isArray(value) && value.length > 0,
        'A form must have at least one field',
      ],
    },
  },
  { timestamps: true }
);

FormSchema.index({ title: 1 });

module.exports = mongoose.model('Form', FormSchema);
