const express = require('express');
const app = express();
const {User} = require('./modules');
const { router } = require('./routes');
const PORT = process.env.PORT || 4100;
const cors = require('cors');

app.use(express.urlencoded( {extended: true} ));
app.use(express.json());
app.use('/api/v1', router);
app.use(cors());

app.listen(PORT, (err)=>{
    err ? console.log(err) : console.log(`App running in PORT ${PORT}`);
});