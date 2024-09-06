// Backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const mentorRoutes = require('./routes/mentorRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/students', studentRoutes);
app.use('/mentors', mentorRoutes);
app.use('/', (req,res)=>{
    res.send({message:"Hello World !!!"})
})

const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
