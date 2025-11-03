const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo');

const companySchema = new mongoose.Schema({
  name: String,
  location: String,
  industry: String
});

const Company = mongoose.model('Company', companySchema);

const industries = ['Health', 'Tech', 'Finance', 'Marketing', 'Retail', 'Education', 'Energy', 'Transport', 'Food', 'Entertainment', 'Automotive', 'Real Estate', 'Consulting', 'Manufacturing', 'Agriculture'];

async function insert() {
  await Company.deleteMany({});
  const companies = [];
  for (let i = 0; i < 100; i++) {
    companies.push({
      name: faker.company.name(),
      location: faker.location.city(),
      industry: industries[Math.floor(Math.random() * industries.length)]
    });
  }
  await Company.insertMany(companies);
  console.log('Inserted 100 companies');
  mongoose.disconnect();
}

insert();