const mongoose = require("mongoose");
const allowedUses = []; // Add your allowed values here

const medicineSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name"],
    },
    picture: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Enter price"],
    },
    use: {
      type: String,
      required: [true, "Uses"],
    },
    description: {
      type: String,
      required: [true, "Enter brief description"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity"],
    },
    sales: {
      type: Number,
      required: [true, "Total sales made"],
    },
    details: {
      type: String,
      required: [true, "Active ingredients"],
    },
    prescribed: {
      type: String,
      enum: ['required', 'not required'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);
