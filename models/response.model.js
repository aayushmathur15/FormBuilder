const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema(
  {
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
      index: true,
    },
    answers: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
    submittedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

ResponseSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('Response', ResponseSchema);
