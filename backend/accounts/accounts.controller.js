const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const accountService = require("./account.service");

// routes
router.post("/authenticate", authenticateSchema, authenticate);

module.exports = router;

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  const { username, password } = req.body;
  const ipAddress = req.ip;
  accountService
    .authenticate({ username, password, ipAddress })
    .then((d) => {
      res.json(d);
    })
    .catch(next);
}
