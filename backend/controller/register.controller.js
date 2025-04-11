const User = require("../model/data.model.js");
const bcrypt = require("bcryptjs");
const Student = require("../model/student.model.js");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: "Email or username already exists!" });
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found!" });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return res.status(400).json({ message: "Wrong password!" });
    res.status(200).json({ message: "User logged in successfully", user: { username: user.username } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// Updated to fetch all fields
const studentdataset = async (req, res) => {
  try {
    const students = await Student.find({}, { _id: 0 }); // Fetch all fields except _id
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Full student dataset (no change needed, but kept for consistency)
const fullStudentDataset = async (req, res) => {
  try {
    const students = await Student.find({}, { _id: 0 }); // Fetch all fields
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching full student data:', error);
    res.status(500).json({ error: 'Failed to fetch full student data' });
  }
};

// Update a student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    console.log('Updated data received:', updatedData); // Debug log
    // Calculate totalCGPA if semesters are updated
    const semesters = ['sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8'];
    const total = semesters.reduce((sum, sem) => sum + (updatedData[sem] || 0), 0);
    updatedData.totalCGPA = (total / semesters.length).toFixed(2);
    console.log('Calculated totalCGPA:', updatedData.totalCGPA); // Debug log
    const student = await Student.findOneAndUpdate({ id }, updatedData, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student); // Return updated student with all fields
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOneAndDelete({ id });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};

module.exports = { register, login, studentdataset, fullStudentDataset, updateStudent, deleteStudent };