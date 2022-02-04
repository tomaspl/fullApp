const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://intranetApp:Elcom2005@cluster0.taat4.mongodb.net/bookflix?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
