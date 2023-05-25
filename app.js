const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("express"));
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "./visor/index.html");
});

// routes
app.use("/api", require("./routes"));

// start server
const port = 3000;
app.listen(port, function () {
  console.log("Server listening on port " + port);
});
