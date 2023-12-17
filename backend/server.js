const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const { render } = require("ejs");
const path = require('path');
const { protectPatient } = require("./middleware/patientMiddleware");

//const port =8000
const port = 8000;
const cors = require("cors");

connectDB();

const app = express();

app.use(cors());

app.use("/backend/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.listen(port, () =>
	console.log(`Server Started On Port ${port}...`.green.bold)
);
// app.get('/' , require('./routes/adminRoutes'))

app.get("/", (req, res) => {
	res.render("home");
});

app.use("/Admin", require("./routes/adminRoutes"));
app.use("/Pharmacist", require("./routes/pharmacistRoutes"));
app.use("/Guest", require("./routes/guestRoutes"));
app.use("/Patient", require("./routes/patientRoutes"));
app.use(protectPatient);
app.use('/payments', require('./middleware/stripeMiddleware'));

