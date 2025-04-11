const express = require('express');
const router = express.Router();
const { register, login, studentdataset, fullStudentDataset, updateStudent, deleteStudent } = require("../controller/register.controller.js");

// Create an account
router.post("/register", register);
// Login page
router.post("/login", login);

// Dataset checking
router.get('/students', studentdataset);

// Full dataset
router.get('/students/full', fullStudentDataset);

// Update endpoint
router.put('/students/:id', updateStudent);
// Delete endpoint
router.delete('/students/:id', deleteStudent);

module.exports = router;