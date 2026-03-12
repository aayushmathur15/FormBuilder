const mongoose = require('mongoose');
const Form = require('../models/form.model');
const Response = require('../models/response.model');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const validateRequiredFields = (form, answers) => {
  const missing = [];

  form.fields.forEach((field) => {
    if (field.required) {
      const answer = answers[field.label];
      const isEmpty = answer === undefined || answer === null || answer === '' || (Array.isArray(answer) && answer.length === 0);
      if (isEmpty) missing.push(field.label);
    }
  });

  return missing;
};

exports.getPublicForm = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid form ID' });
  }

  const form = await Form.findById(id).lean();
  if (!form) {
    return res.status(404).json({ message: 'Form not found' });
  }

  res.json(form);
};

exports.submitResponse = async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid form ID' });
  }

  const form = await Form.findById(id);
  if (!form) {
    return res.status(404).json({ message: 'Form not found' });
  }

  const missing = validateRequiredFields(form, answers);
  if (missing.length) {
    return res.status(400).json({
      message: 'Missing required fields',
      missing,
    });
  }

  const response = await Response.create({
    form: form._id,
    answers,
  });

  res.status(201).json(response);
};
