const mongoose = require('mongoose');
const DB_URL = 'mongodb+srv://api_usr_db:apiPass@appapidevf-yax2r.mongodb.net/test_db?retryWrites=true&w=majority';
const User = require('./User');

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    !err ? console.log('DB Connection Successfully') : console.log(err);
});

module.exports = {
    User
}