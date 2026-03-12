const mongoose = require('mongoose');
const Form = require('../models/form.model');
const Response = require('../models/response.model');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.createForm = async (req, res) => {
  const form = await Form.create(req.body);
  res.status(201).json(form);
};

exports.getForms = async (req, res) => {
  const forms = await Form.find().sort({ createdAt: -1 });
  res.json(forms);
};

exports.getFormById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid form ID' });
  }

  const form = await Form.findById(id);
  if (!form) {
    return res.status(404).json({ message: 'Form not found' });
  }

  res.json(form);
};

exports.updateForm = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid form ID' });
  }

  const updated = await Form.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return res.status(404).json({ message: 'Form not found' });
  }

  res.json(updated);
};

exports.deleteForm = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid form ID' });
  }

  const form = await Form.findByIdAndDelete(id);
  if (!form) {
    return res.status(404).json({ message: 'Form not found' });
  }

  // Remove related responses to keep data consistent
  await Response.deleteMany({ form: form._id });

  res.status(204).end();
};

exports.duplicateForm = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid form ID' });
  }

  const original = await Form.findById(id).lean();
  if (!original) {
    return res.status(404).json({ message: 'Form not found' });
  }

  const copy = {
    title: `Copy of ${original.title}`,
    description: original.description,
    fields: original.fields,
  };

  const duplicated = await Form.create(copy);

  res.status(201).json(duplicated);
};

exports.getFormResponses = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid form ID' });
  }

  const form = await Form.findById(id);
  if (!form) {
    return res.status(404).json({ message: 'Form not found' });
  }

  const responses = await Response.find({ form: id }).sort({ submittedAt: -1 });

  res.json({ formId: id, title: form.title, responses });
};
