const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.json);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(routes);
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/socialnetworkdb",
  {
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
