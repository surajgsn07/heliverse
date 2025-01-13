const mongoose = require('mongoose');

const mealDeliverySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart', required: true },
  pantryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pantry', required: true },
  deliveryPersonId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPerson' },
  status: { type: String, enum: ['Pending','Prepared', 'Out for Delivery', 'Delivered'], default: 'Pending' },
  timestamps: { type: Date, default: Date.now },
  shift: { type: String, enum: ['Morning', 'Evening', 'Night'], default: 'Morning' }
});

module.exports = mongoose.model('MealDelivery', mealDeliverySchema);
