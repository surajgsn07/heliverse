const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  diseases: [String],
  allergies: [String],
  roomNumber: { type: String, required: true },
  bedNumber: { type: String, required: true },
  floorNumber: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String},
  contactInfo: { type: String},
  emergencyContact: { type: String },
});

// Pre-save hook to hash the password
patientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to validate password
patientSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate JWT token
patientSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, role: 'patient' }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = mongoose.model('Patient', patientSchema);
