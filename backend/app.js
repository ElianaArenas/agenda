const express = require("express");
const agendaRoutes = require("./routes/agenda.routes.js");
const cors = require("cors")

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

//settings
app.set("port", 3000);

app.use(express.json());

//routes
app.use("/api/agenda", agendaRoutes);



module.exports = app;