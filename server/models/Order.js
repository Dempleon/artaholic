const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  arts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Art",
    },
  ],
});

orderSchema.virtual("orderTotal").get(function () {});

const Order = model("Order", orderSchema);

module.exports = Order;
