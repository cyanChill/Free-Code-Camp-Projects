const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// Start of Code:
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Connected to DB");
});

let exerciseSessionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: String,
});

let userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  log: [exerciseSessionSchema],
});

let Session = mongoose.model("Session", exerciseSessionSchema);
let User = mongoose.model("User", userSchema);

app
  .route("/api/users")
  .get((req, res) => {
    User.find({}, (err, arrOfUsers) => {
      if (!err) {
        res.json(arrOfUsers);
      }
    });
  })
  .post((req, res) => {
    let newUser = new User({ username: req.body.username });
    newUser.save((err, savedUser) => {
      if (!err) {
        let responseObj = { username: savedUser.username, _id: savedUser.id };
        res.json(responseObj);
      }
    });
  });

app.post("/api/users/:_id/exercises", (req, res) => {
  let newSession = new Session({
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: req.body.date,
  });
  const userId = req.params["_id"];

  if (!newSession.date) {
    newSession.date = new Date().toISOString().substring(0, 10);
  }

  User.findOneAndUpdate({ _id: userId }, { $push: { log: newSession } }, (err, updatedUser) => {
    const responseObj = {
      username: updatedUser.username,
      description: newSession.description,
      duration: newSession.duration,
      date: new Date(newSession.date).toDateString(),
      _id: userId,
    };

    res.json(responseObj);
  });
});

app.get("/api/users/:_id/logs", (req, res) => {
  const userId = req.params["_id"];
  const { from, to, limit } = req.query;

  User.findById(userId, (err, user) => {
    const formatedLog = user.log.map((session) => {
      return {
        description: session.description,
        duration: session.duration,
        date: new Date(session.date).toDateString(),
      };
    });

    const responseObj = {
      username: user.username,
      count: user.log.length,
      _id: userId,
      log: formatedLog,
    };

    const responseObj = {
      username: user.username,
      count: user.log.length,
      _id: userId,
      log: formatedLog,
    };

    if (to || from) {
      let fromDate = from ? new Date(from) : new Date(0);
      let toDate = to ? new Date(to) : new Date();

      fromDate = fromDate.getTime();
      toDate = toDate.getTime();

      responseObj.log = responseObj.log.filter((session) => {
        const sessionTime = new Date(session.date).getTime();
        return sessionTime >= fromDate && sessionTime <= toDate;
      });
    }

    if (limit) {
      responseObj.log = responseObj.log.slice(0, limit);
    }

    res.json(responseObj);
  });
});

// Handle for requests that don't exist
app.get("*", (req, res) => {
  res.send("not found");
});
