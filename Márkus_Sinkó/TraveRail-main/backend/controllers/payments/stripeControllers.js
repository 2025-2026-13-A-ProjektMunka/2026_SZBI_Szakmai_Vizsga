import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripePayment = async (req, res) => { 
	try {
        const { items } = req.body;
        
        const tomb = [];
        items.forEach(elem => {
            const obj =  {
                    price_data: {
                        currency: "huf",
                        product_data: {
                            name: elem.schedule.darabszam,
                            images: [elem.schedule.kep]
                        },
                        unit_amount: elem.schedule.ar * 100
                    },
                    quantity: elem.darabszam
            }
            tomb.push(obj);
        });

        if (items.length === 0) {
            return res.status(400).json({ error: "Hiányzó adatok" });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: tomb,
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        });

		res.statusCode = 201;
        return res.json({ url: session.url });
	} catch (error) {
		res.statusCode = 500;
		return res.json({ msg: 'Valami hiba történt: ' + error.message });
	}
};