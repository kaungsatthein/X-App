require("dotenv").config();

const express = require("express")
const app = express();

const cors = require("cors")
app.use(cors());

const { userRouter } = require("./routers/users")
app.use(userRouter);

app.listen(process.env.PORT, () => {
    console.log(`X api is running as ${process.env.PORT}`);
})