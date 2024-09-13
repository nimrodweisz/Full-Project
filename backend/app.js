const express = require('express');
const bodyParser = require('body-parser'); // Consider removing or replacing with express.json()
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const carRouthes = require('./routes/carRouth.js')
const PORT = 5000;
const authRoutes = require('./routes/authRoutes.js');
const MatomoTracker = require('matomo-tracker');

const { dashboard } = require('./controllers/authController.js');
 const corsOptions = {
  // origin: 'http://localhost',
  origin: 'http://localhost:3000',
  credentials: true 

}
const matomo = new MatomoTracker(1, 'http://localhost:8080/matomo.php');

// Track a visit or action
matomo.track({
  url: 'http://localhost:3000',
  action_name: 'Page View',
 
});

app.use(cors(corsOptions));

app.use(cookieParser()); // Move this up before other body parsers
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

//  mongoose.connect('mongodb://host.docker.internal:27017/ilcarsDB').then(() => console.log('Connected to MongoDB...'))
mongoose.connect("mongodb://localhost:27017/ilcarsDB")
.catch(err => console.error('Could not connect to MongoDB...', err));


app.use(authRoutes);
app.use(carRouthes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
