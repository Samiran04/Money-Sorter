const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
module.exports.create = async function (req, res) {
  try {
    if (req.body.confirm_password !== req.body.password) {
      return json(400, {
        message: "Confirm Password and Password Dont match",
        success: false,
      });
    }

    let user = await User.findOne({ email: req.user.email });

    if (user) {
      return json(400, {
        message: "User Already Exist",
        success: false,
      });
    }

    user = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });

    return res.json(200, {
      data: {
        user: user,
      },
      success: true,
    });
  } catch (err) {
    console.log("Error in Create User", err);
    return res.json(400, {
      message: "Error in Create User",
      success: false,
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res.json(400, {
        message: "Invalid User Id or Password",
        success: false,
      });
    } else {
      return res.json(200, {
        message: "You are loged in and take care of your token now",
        data: {
          token: jwt.sign(user.toJSON(), "Codeial", { expiresIn: "1000000" }),
        },
        success: true,
      });
    }
  } catch (err) {
    console.log("Error in CreateSession User", err);
    return res.json(400, {
      message: "Error in CreateSession User",
      success: false,
    });
  }
};
