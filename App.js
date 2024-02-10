const express = require("express");
const cors = require("cors");

const areaRoutes = require('./routes/areasRoutes')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/areas', areaRoutes);

app.get("/", (req, res) => {
  res.send("<h2>Back is working!</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
