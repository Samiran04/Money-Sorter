const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    users: [
      {
        name: {
          type: String,
        },
        money: {
          type: Number,
        },
      },
    ],
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
