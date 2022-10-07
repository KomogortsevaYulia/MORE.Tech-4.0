require("dotenv").config();
const morgan = require('morgan');
const express = require('express');
const cors = require("cors");
const router = require("./routes");
const PORT = process.env.PORT || 8080;
const app = express();
const path = require('path');

app.use(morgan('tiny'))
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
    console.log('Server running on http://localhost:8080!');
});