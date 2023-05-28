const router = require('express').Router();
const peopleController = require('./peopleController.js');

router.post('/addpeople',peopleController.addPeople)


module.exports = router;