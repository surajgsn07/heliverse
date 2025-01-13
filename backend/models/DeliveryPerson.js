const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const deliveryPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  assignedMeals: [
    {
      mealDeliveryId: { type: mongoose.Schema.Types.ObjectId, ref: 'MealDelivery' },
      status: { type: String, enum: ['Assigned', 'Delivered'], default: 'Assigned' },
      timestamp: { type: Date }
    }
  ],
  pantry:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pantry'
  }
});

// Pre-save hook to hash the password
deliveryPersonSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to validate password
deliveryPersonSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate JWT token
deliveryPersonSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, role: 'delivery' }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = mongoose.model('DeliveryPerson', deliveryPersonSchema);
