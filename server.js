require('dotenv').config();
const mongoose = require('mongoose');
const { createServer } = require('http');
const app = require('./app');
const { Server } = require('socket.io');

const { dbURI } = process.env;
const PORT = process.env.PORT || 3001;

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('connected to db'))
  .catch((err) => console.log(err));
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.on('connection', socket => {
  console.log(socket.id);

});

module.exports = io;