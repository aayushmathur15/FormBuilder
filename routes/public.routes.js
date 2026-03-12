const express = require('express');
const router = express.Router();

const asyncHandler = require('../middlewares/async.middleware');
const validate = require('../middlewares/validate.middleware');
const { submitResponseSchema } = require('../utils/validationSchemas');
const responseController = require('../controllers/response.controller');

router.get('/:id', asyncHandler(responseController.getPublicForm));
router.post('/:id/submit', validate(submitResponseSchema), asyncHandler(responseController.submitResponse));

module.exports = router;
