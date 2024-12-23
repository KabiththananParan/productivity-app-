const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ActivityRouter = require("./routes/activity.route");


const app = express();


/* Loading the environment variables from the .env file. */
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/activities';


// Middleware
app.use(cors());
app.use(express.json());

/* Telling the application to use the ActivityRouter for any requests that start with "/api". */
app.use("/api", ActivityRouter);


app.get("/", (req, res) => {
    res.send("Hello World");
})

/* Connecting to the database and then starting the server. */
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));
  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
