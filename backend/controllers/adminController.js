const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.adminRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await User.findOne({ email, role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      email,
      password: hashedPassword,
      isVerified: true, // Admins are auto-verified
      role: 'admin'
    });

    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Server error during admin registration' });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, message: 'Admin login successful' });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during admin login' });
  }
};