const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (error) {
    const details = error.details.map((d) => d.message).join(', ');
    return next({ status: 400, message: details });
  }

  req[property] = value;
  return next();
};

module.exports = validate;
