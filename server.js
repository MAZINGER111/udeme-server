require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server started on port ${port} and connected to DB`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
