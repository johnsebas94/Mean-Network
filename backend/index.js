const express = require("express");
const cors = require("cors");
const { dbConnectionNetwork } = require("./db/db_network");
const User = require("./routes/user");
const Post = require("./routes/post")

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", User);
app.use("/api/post", Post);
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

dbConnectionNetwork();
