require('dotenv').config();
const app = require("./app")
const mongoose = require('mongoose');

const dbURI = process.env.dbURI
const PORT = process.env.PORT || 3001

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('connected to db'))
    .catch((err) => console.log(err))
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

