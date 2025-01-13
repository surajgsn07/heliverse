const mongoose = require('mongoose');

const dietChartSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  morning: {
    meal: { type: String, required: true },
    ingredients: [String],
    instructions: String
  },
  evening: {
    meal: { type: String, required: true },
    ingredients: [String],
    instructions: String
  },
  night: {
    meal: { type: String, required: true },
    ingredients: [String],
    instructions: String
  }
});

module.exports = mongoose.model('DietChart', dietChartSchema);
