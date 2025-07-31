const express = require('express');
const cors = require('cors');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const dotenv = require('dotenv');

const user = require('./routes/userRoute');
const chat = require('./routes/chatRoutes');
const message = require('./routes/messageRoutes');

dotenv.config({ path: 'config.env' });
dbConnection();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  //credentials: true, // if you are using cookies or sessions
}));

app.use(express.json());

app.use('/api/users', user);
app.use('/api/chats', chat);
app.use('/api/messages', message);


app.all('*sth', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

//global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
