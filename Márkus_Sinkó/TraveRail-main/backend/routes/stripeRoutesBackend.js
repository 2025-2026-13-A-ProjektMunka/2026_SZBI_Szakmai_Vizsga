const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
    // try {
    //     const { darab, jegy, ar } = req.body;
    //     // console.log({ darab, jegy, ar });
    //     const szoveg = `${jegy.honnan} -> ${jegy.hova}`;
    //     console.log(szoveg);
    //     router.post("/create-checkout-session", async (req, res) => {
    try {
        const { darab, jegy, ar } = req.body;
        // console.log({ darab, jegy, ar });
        const szoveg = `${jegy.honnan} -> ${jegy.hova}`;
        console.log(szoveg);
        
        const line_items = {
            price_data: {
                currency: "huf",
                product_data: {
                    name: szoveg,
                },
                unit_amount: Math.round(parseFloat(ar) * 100), 
            },
            quantity: darab
        }

        
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            allow_promotion_codes: true,
            payment_method_types: ["card"],
            line_items: [line_items],
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });
        
        console.log("Session + ", session);
        res.status(201).json({ url: session.url });

    } catch (error) {
        console.error("Stripe hiba:", error.message);
        res.status(500).json({ msg: 'A hiba: ' + error.message });
    }
});

router.get("/checkout-session/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id, {
      expand: ["line_items"],
    });

    res.json({
      customer_name: session.customer_details?.name || "—",
      product: session.line_items.data[0].description,
      quantity: session.line_items.data[0].quantity,
      amount: session.amount_total,
      payment_intent: session.payment_intent,
      created: session.created,
    });
  } catch (err) {
    res.status(400).json({ error: "Érvénytelen session ID" });
  }
});

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Stripe = require("stripe");

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// router.post("/create-checkout-session", async (req, res) => {
//     try {
//         const { items } = req.body;
//         console.log(items);
        

//         if (items.length === 0) {
//             return res.status(400).json({ error: "Hiányzó adatok" });
//         }

//         const session = await stripe.checkout.sessions.create({
//             mode: "payment",
//             payment_method_types: ["card"],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: "huf",
//                         product_data: {
//                             nev: nev
//                         },
//                         unit_amount: ar * 100
//                     },
//                     quantity: 1
//                 }
//             ],
//             success_url: "http://localhost:5173/",
//             cancel_url: "http://localhost:5173/cart"
//         });

//         res.status(200).json({ url: session.url });

//     } catch (error) {
//         console.error("Stripe hiba:", error.message);
//         res.status(500).json({ error: "Stripe hiba" });
//     }
// });

// module.exports = router;