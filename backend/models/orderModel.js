const mongoose = require("mongoose");
const Patient = require('./patientModel')

const orderSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum : ["delivered", "cancelled", "shipped", "preparing", "pending"]
    },
    dateOfOrder : {
        type: Date,
        required: true
    },
    dateOfDelivery : {
        type: Date,
        required: true
    },
    deliveryAddress : {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    }, 
    orderdetails: [{
    
        medicineName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          
        },
        picture: {
          type: String

           }

  }],
    
    },
    {
        timestamps: true
    })
    
    module.exports = mongoose.model('Order', orderSchema);