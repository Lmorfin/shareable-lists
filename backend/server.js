require("dotenv").config();

const express = require("express");
const router = require("./routes");
const cors = require("cors");

//express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log("Express app listening on port:", process.env.PORT);
});
