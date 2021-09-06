const mongoose = require("mongoose");

const dbConnectionNetwork = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection with MongoDB: ON");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    throw new Error("Error connecting to MongoDB");
  }
};

module.exports = { dbConnectionNetwork };
