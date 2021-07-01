const Trip = require("../../../models/trip");
const User = require("../../../models/user");

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
