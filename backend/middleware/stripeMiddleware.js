const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51O5E1tGcxLxGfGifF01UebA7RcC5SaFlaxYtLlkdDoe6FKcbKwBrjeBDvsBkuqsEK0MiKPfGtDtSSwRldMuG1cCM00tnesPpg4');
const Patient = require('../models/patientModel');
const Medicine = require('../models/medicineModel');


router.post('/create-checkout-session', async (req, res) => {
    try {
        const user = req.user;
    if (!user || !user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

        const id = user._id;
        const total = req.body.total;
        const items = req.body.items

        const patient = await Patient.findById(id);


        const packageType = patient.healthPackage ? patient.healthPackage.name : null;

        let Discount = 0;
        
          
        // Calculate discounts based on the packageType
        // switch (patient.healthPackage.name) {
        switch (packageType) {
            case 'Silver':
                Discount = 0.2; break;
          
            case 'Gold':
                Discount = 0.3; break;
          
            case 'Platinum':
               Discount = 0.4; break;
          
            default:
                Discount = 0;
        }
          
              

        // const storeItems = new Map([
        //     [1, { priceInCents: paymentAmount * 100, name: '3ayat'}], // priceInSharks = pounds * 100
           
        // ])
        // END OF PASTE


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items.map(item => {
                const storeItem = item.itemId;
                // if (!storeItem) {
                //     throw new Error("Item does not exists");
                // }
                // console.log(storeItem);
                return {
                    price_data: {
                        currency: 'egp',
                        product_data: {
                            name: item.name,
                        },                   

                        unit_amount: (item.price - (item.price* Discount)) *100,
                    },
                    quantity: item.quantity,

                };
            }),
            success_url: 'http://localhost:3000/order',
            cancel_url: 'http://localhost:3000/checkout',
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;