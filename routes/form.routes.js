const express = require('express');
const router = express.Router();

const asyncHandler = require('../middlewares/async.middleware');
const validate = require('../middlewares/validate.middleware');
const { createFormSchema, updateFormSchema } = require('../utils/validationSchemas');
const formController = require('../controllers/form.controller');

router.post('/', validate(createFormSchema), asyncHandler(formController.createForm));
router.post('/:id/duplicate', asyncHandler(formController.duplicateForm));
router.get('/', asyncHandler(formController.getForms));
router.get('/:id', asyncHandler(formController.getFormById));
router.put('/:id', validate(updateFormSchema), asyncHandler(formController.updateForm));
router.delete('/:id', asyncHandler(formController.deleteForm));
router.get('/:id/responses', asyncHandler(formController.getFormResponses));

module.exports = router;
