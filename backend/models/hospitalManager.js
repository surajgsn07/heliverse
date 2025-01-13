const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the schema for Hospital Manager
const hospitalManagerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true // Just a string role (e.g., 'Admin', 'Manager', 'Staff')
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash the password before saving the document
hospitalManagerSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Hash the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

// Method to generate JWT token
hospitalManagerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, 'your_jwt_secret', { expiresIn: '1h' });
  return token;
};

// Create a model for HospitalManager
module.exports = mongoose.model('HospitalManager', hospitalManagerSchema);
