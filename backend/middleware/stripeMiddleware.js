const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);


router.post('/create-checkout-session/:id', async (req, res) => {
    try {
        
       
          const total=req.body.total;
          
        // Retrieve the package type from the associated healthPackage
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
          
              
        const paymentAmount = total - (total * doctorSessionDiscount);

        const storeItems = new Map([
            [1, { priceInCents: paymentAmount * 100, name: `Appointment for ${ patient.firstName } - Dr. ${ doctor.firstName }` }], // priceInSharks = pounds * 100
           
        ])
        // END OF PASTE



        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id);

                if (!storeItem) {
                    throw new Error("Item does not exists");
                }

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