const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51O5E1tGcxLxGfGifF01UebA7RcC5SaFlaxYtLlkdDoe6FKcbKwBrjeBDvsBkuqsEK0MiKPfGtDtSSwRldMuG1cCM00tnesPpg4');
const Patient = require('../models/patientModel');


router.post('/create-checkout-session/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body);
        const total = req.body.total;
        // Retrieve the package type from the associated healthPackage
        console.log('ma3lesh');
        const patient = await Patient.findById(id);
        console.log(patient);
        console.log('ma3lesh 2');


        const packageType = patient.healthPackage ? patient.healthPackage.name : null;
        console.log('ma3lesh 3');
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
                console.log('ma3lesh 4');
                Discount = 0;
        }
          
              
        const paymentAmount = 800 - (800 * Discount);

        const storeItems = new Map([
            [1, { priceInCents: paymentAmount * 100, name: '3ayat'}], // priceInSharks = pounds * 100
           
        ])
        // END OF PASTE

        console.log('ma3lesh 5')

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id);
                console.log(item);
                if (!storeItem) {
                    throw new Error("Item does not exists");
                }
                console.log(storeItem);
                return {
                    price_data: {
                        currency: 'egp',
                        product_data: {
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// app.post("/create-checkout-session", async (req, res) => {
//     try {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         mode: "payment",
//         line_items: req.body.items.map(item => {
//           const storeItem = storeItems.get(item.id);
  
//           if (!storeItem) {
//             // throw new Error(Store item not found for id: ${item.id});
//             throw new Error('blalblabla')
//           }
//            return {
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: storeItem.name,
//               },
//               unit_amount: storeItem.priceInCents,
//             },
//             quantity: item.quantity,
//           };
//         }),
//         success_url:'http://localhost:3000/success',
//         cancel_url:'http://localhost:3000/cancel',
//       });
  
//       res.json({ url: session.url });
//     } catch (e) {
//       res.status(500).json({ error: e.message });
//     }
// });

module.exports = router;