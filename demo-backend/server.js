const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const companySchema = new mongoose.Schema({
  name: String,
  location: String,
  industry: String
});

const Company = mongoose.model('Company', companySchema);

// GET /api/companies - with optional filters, pagination
app.get('/api/companies', async (req, res) => {
  try {
    const { name, location, industry, limit = 10, skip = 0 } = req.query;
    let filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (location) filter.location = new RegExp(location, 'i');
    if (industry) filter.industry = new RegExp(industry, 'i');
    const companies = await Company.find(filter).limit(parseInt(limit)).skip(parseInt(skip));
    const total = await Company.countDocuments(filter);
    res.json({ companies, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/filters - get unique locations and industries
app.get('/api/filters', async (req, res) => {
  try {
    const locations = await Company.distinct('location');
    const industries = await Company.distinct('industry');
    res.json({ locations, industries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/companies
app.post('/api/companies', async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5001, () => console.log('Server running on port 5001'));