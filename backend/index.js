const app = require("./app");
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("Database Connection Succeeded");
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(PORT, () => {
    console.log(`E-Shop Server is running at http://localhost:${PORT}`);
});