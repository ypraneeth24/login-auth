const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate'); // ✅ Import the plugin

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  avatar: { type: String },
  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // 👈 Add this
  createdAt: { type: Date, default: Date.now }
});

// ✅ Attach the plugin to the schema
UserSchema.plugin(findOrCreate);

// ✅ Export the compiled model
module.exports = mongoose.model('User', UserSchema);

