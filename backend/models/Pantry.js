const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pantrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  assignedTasks: [
    {
      dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart' },
      status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
    }
  ],
  status:{
    type:String,
    enum:['Active','Inactive'],
    default:'Active'
  }
});

// Pre-save hook to hash the password
pantrySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to validate password
pantrySchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate JWT token
pantrySchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, role: 'pantry' }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = mongoose.model('Pantry', pantrySchema);
