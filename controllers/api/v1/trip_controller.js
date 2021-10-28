const Trip = require("../../../models/trip");
const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const env = require("../../../config/environment");

module.exports.create = async function (req, res) {
  try {
    let trip = await Trip.findOne({
      name: req.body.name,
      email: req.body.email,
    });

    if (!trip) {
      trip = await Trip.create({
        name: req.body.name,
        email: req.body.email,
      });

      let user = await User.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: { tripsList: trip._id },
        }
      );
    } else {
      return res.json(500, {
        message: "Same name Trip already exist",
        success: false,
      });
    }

    return res.json(200, {
      success: true,
      data: {
        trip: trip,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Error in Trip Code",
      success: false,
    });
  }
};

module.exports.createUser = async function (req, res) {
  try {
    let trip = await Trip.findById(req.body.tripId);

    let username = req.body.name;

    for (let user of trip.users) {
      if (user.name == username) {
        return res.json(500, {
          message: "Same user exist",
          success: false,
        });
      }
    }

    let user = {
      name: username,
      money: 0,
    };

    trip.users.push(user);
    trip.save();

    return res.json(200, {
      success: true,
      data: {
        trip: trip,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Error in Trip Code",
      success: false,
    });
  }
};

module.exports.fetchTripsList = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.query.email }).populate(
      "tripsList"
    );

    return res.json(200, {
      success: true,
      data: {
        tripsList: user.tripsList,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Error in Fetch Trip Code",
      success: false,
    });
  }
};

module.exports.getTripData = async function (req, res) {
  try {
    let trip = await Trip.findById(req.query.tripId);

    return res.json(200, {
      success: true,
      data: {
        trip: trip,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Error in Get Trip Data Code",
      success: false,
    });
  }
};

module.exports.changeMoney = async function (req, res) {
  try {
    let trip = await Trip.findById(req.body.tripId);

    for (let user of trip.users) {
      if (user.name === req.body.name) {
        user.money = req.body.money;
        break;
      }
    }

    trip.save();

    return res.json(200, {
      success: true,
      data: { trip: trip },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Error in Change Money Data Code",
      success: false,
    });
  }
};

module.exports.calcuate = async function (req, res) {
  try {
    let trip = await Trip.findById(req.query.id);

    let total = 0,
      n = trip.users.length,
      temp = trip.users;

    if (n === 0) {
      return res.json(200, {
        success: true,
        data: {
          solution: [],
          common: -1,
        },
      });
    }

    for (var user of trip.users) {
      total += user.money;
    }

    let re = [],
      common = total / n;

    for (var user of temp) {
      user.money = user.money - common;
    }

    while (1) {
      let val1 = -1,
        Max = -1,
        curr = 0;

      for (var user of temp) {
        if (user.money > val1) {
          val1 = user.money;
          Max = curr;
        }

        curr++;
      }

      let val2 = 1,
        Min = -1;

      curr = 0;

      for (var user of temp) {
        if (user.money < val2) {
          val2 = user.money;
          Min = curr;
        }

        curr++;
      }

      if (temp[Max].money == 0 || temp[Min].money == 0) break;

      let name1 = temp[Max].name;
      let name2 = temp[Min].name;

      let b = -temp[Min].money;
      let a = temp[Max].money;

      let val;

      if (a > b) val = b;
      else val = a;

      temp[Min].money += val;
      temp[Max].money -= val;

      val = val.toFixed(2);

      let string = name2 + " pay " + val + " rupess to " + name1;

      re.push(string);
    }

    return res.json(200, {
      success: true,
      data: {
        solution: re,
        common: common.toFixed(2),
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Error in Trip Code",
      success: false,
    });
  }
};

module.exports.deleteUser = async function (req, res) {
  try {
    let trip = await Trip.findById(req.query.tripId);

    let users = trip.users,
      i = 0;

    for (let user of users) {
      if (req.query.name === user.name) {
        break;
      }
      i++;
    }

    trip.users.splice(i, 1);
    trip.save();

    return res.json(200, {
      success: true,
      data: {
        trip: trip,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Error in Delete User Code",
      success: false,
    });
  }
};

module.exports.deleteTrip = async function (req, res) {
  try {
    let trip = await Trip.findByIdAndDelete(req.query.tripId);

    let user = await User.findOneAndUpdate(
      { email: trip.email },
      {
        $pull: { tripsList: trip._id },
      }
    ).populate("tripsList");

    return res.json(200, {
      success: true,
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret_key, {
          expiresIn: "1000000",
        }),
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Error in Delete Trip Code",
      success: false,
    });
  }
};
