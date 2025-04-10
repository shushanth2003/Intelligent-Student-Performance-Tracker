const User = require("../model/data.model.js");
const bcrypt = require("bcryptjs");
const Student=require("../model/student.model.js")


const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if email or username already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) return res.status(400).json({ message: "Email or username already exists!" });
  
      // Create new user (pre-save hook will hash the password)
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
  
      res.status(200).json({ message: "User logged in successfully",user:{username:user.username} });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error!" });
    }
  };

  const studentdataset = async (req, res) => {
    try {
      const students = await Student.find({}, { name: 1, id: 1, totalCGPA: 1, attendance: 1, _id: 0 });
      res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  };
  
  module.exports = { register, login, studentdataset };