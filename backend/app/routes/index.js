const express = require('express');
const session = require('./sessions');
const sessionHistory = require('./sessionHistories');
const user = require('./users');
// ...

const router = express.Router();

// Bonus: you can split this /routes folder in 2: private and public.
// In the private index.js file you would precede all routes declaration
// with a function that checks if the authentication token is present
// in all requests and it's valid.
router.use(session);
//router.use(sessionHistory);
router.use(user);

module.exports = router;
