const router = require('express').Router();
const peopleController = require('./peopleController.js');

router.post('/addpeople',peopleController.addPeople);
router.get('/getPeople',peopleController.getPeople)


module.exports = router;