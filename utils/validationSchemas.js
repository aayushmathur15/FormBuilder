const Joi = require('joi');

const fieldSchema = Joi.object({
  label: Joi.string().trim().required(),
  type: Joi.string().valid('text', 'dropdown', 'checkbox', 'radio').required(),
  required: Joi.boolean().default(false),
  options: Joi.array().items(Joi.string().trim()).default([]),
}).custom((value, helpers) => {
  if (['dropdown', 'radio'].includes(value.type) && (!Array.isArray(value.options) || value.options.length === 0)) {
    return helpers.error('any.custom', { message: 'options must be a non-empty array for dropdown and radio fields' });
  }
  return value;
}, 'Field type option validation');

const createFormSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().allow('', null),
  fields: Joi.array().items(fieldSchema).min(1).required(),
});

const updateFormSchema = Joi.object({
  title: Joi.string().trim(),
  description: Joi.string().trim().allow('', null),
  fields: Joi.array().items(fieldSchema).min(1),
}).min(1);

const submitResponseSchema = Joi.object({
  answers: Joi.object().required(),
});

module.exports = {
  createFormSchema,
  updateFormSchema,
  submitResponseSchema,
};
