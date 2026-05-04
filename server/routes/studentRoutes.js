const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.post('/', studentController.addStudent);

// Line 10 (where your error is): Ensure this name matches the controller!
router.put('/:id', studentController.updateStudent); 

router.delete('/:id', studentController.deleteStudent);

module.exports = router;