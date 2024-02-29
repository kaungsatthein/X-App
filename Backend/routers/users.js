require("dotenv").config();

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_HOST);
const xdb = mongo.db("x");
const xusers = xdb.collection("users");

const { auth } = require("../middlewares/auth")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/verify", auth, (req, res) => {
  return res.json(res.locals.user)
})

router.get("/users", auth, async (req, res) => {
  const data = await xusers.find().project({ password: 0 }).limit(20).toArray();
  return res.json(data);
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const data = await xusers.findOne(
    { _id: new ObjectId(id) },
    { projection: { password: 0 } }
  );
  return res.json(data);
});

router.post("/login", async (req, res) => {
  const { handle, password } = req.body;
  if (!handle || !password) {
    return res.status(400).json({ msg: "Handle or password required!" });
  }
  const user = await xusers.findOne(
    { handle },
    {
      projection: {
        followers: 0,
        following: 0,
      },
    }
  );
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ token });
    }
  }
  return res.status(401).json({
    msg: "Incorrect handle or password",
  });
});

module.exports = { userRouter: router };
