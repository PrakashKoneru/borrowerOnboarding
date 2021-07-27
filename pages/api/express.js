const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");
const middlewareAuth = require("./middleware/authorize.js")

//middleware

app.use(cors());
app.use(express.json());
pool();

//routes

app.use("/authentication", require("./routes/auth"));
app.use("/", require("./routes/scoreCalculator"));
app.use("/", middlewareAuth, require("./routes/dashboard"));

app.listen(5002, () => {
  console.log(`Server is starting on port 5002`);
});
