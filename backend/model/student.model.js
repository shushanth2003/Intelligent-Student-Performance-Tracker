const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  sem1: { type: Number, required: true },
  sem2: { type: Number, required: true },
  sem3: { type: Number, required: true },
  sem4: { type: Number, required: true },
  sem5: { type: Number, required: true },
  sem6: { type: Number, required: true },
  sem7: { type: Number, required: true },
  sem8: { type: Number, required: true },
  totalCGPA: { type: Number, required: true },
  attendance: { type: Number, required: true },
});

// Explicitly map to 'studentdataset' collection
const Student = mongoose.model('Student', studentSchema, 'studentdataset');
module.exports = Student;