const express = require('express');
const router = express.Router();

const asyncHandler = require('../middlewares/async.middleware');
const validate = require('../middlewares/validate.middleware');
const { requireAdmin } = require('../middlewares/auth.middleware');
const { createFormSchema, updateFormSchema } = require('../utils/validationSchemas');
const formController = require('../controllers/form.controller');

router.post('/', requireAdmin, validate(createFormSchema), asyncHandler(formController.createForm));
router.post('/:id/duplicate', requireAdmin, asyncHandler(formController.duplicateForm));
router.get('/', asyncHandler(formController.getForms));
router.get('/:id', asyncHandler(formController.getFormById));
router.put('/:id', requireAdmin, validate(updateFormSchema), asyncHandler(formController.updateForm));
router.delete('/:id', requireAdmin, asyncHandler(formController.deleteForm));
router.get('/:id/responses', requireAdmin, asyncHandler(formController.getFormResponses));

module.exports = router;
