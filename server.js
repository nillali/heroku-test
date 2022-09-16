require('dotenv').config();
const app = require("./app")
const mongoose = require('mongoose');

const registerRoute = require("./routes/register.js");
const userRoute = require("./routes/users.js");
const loginRoute = require("./routes/login.js");

// const allUsers = "/api/v0/users";
// const authorizeUser = "/api/v0/authorize";
// const registerUser = "/api/v0/register";

<<<<<<< HEAD
=======
// const { users } = require('./db')
const app = express();

app.use(cors());

>>>>>>> b340e33a86ce564ffa4a3ebd09bfc554a6e72d1e
const dbURI = process.env.dbURI
const PORT = process.env.PORT || 3001

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('connected to db'))
    .catch((err) => console.log(err))
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

<<<<<<< HEAD
=======
app.use(express.json());

const swaggerDocument = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/api/v0/register", registerRoute);
app.use("/api/v0/users", userRoute);
app.use("/api/v0/authorize", loginRoute);

module.exports = app;
>>>>>>> b340e33a86ce564ffa4a3ebd09bfc554a6e72d1e
