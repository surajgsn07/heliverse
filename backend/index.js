const express = require('express');
const connectDB = require('./db/index.js');
const cors = require('cors');
// Initialize express app
const app = express();

connectDB();
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],

}));


app.use(express.json()); // To parse JSON request bodies

const patientRoutes = require('./routes/patientRoutes');
const dietChartRoutes = require('./routes/dietChartRoutes');
const deliveryPersonRoutes = require('./routes/deliveryPersonRoutes');
const mealDeliveryRoutes = require('./routes/mealDeliveryRoutes');
const pantryRoutes = require('./routes/pantryRotues');
const HospitalManagerRoutes = require('./routes/hospitalManagerRoutes');

app.use('/patient', patientRoutes);
app.use('/dietChart', dietChartRoutes);
app.use('/delivery', deliveryPersonRoutes);
app.use('/mealDelivery', mealDeliveryRoutes);
app.use('/pantry', pantryRoutes);
app.use('/hospitalManager', HospitalManagerRoutes);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
