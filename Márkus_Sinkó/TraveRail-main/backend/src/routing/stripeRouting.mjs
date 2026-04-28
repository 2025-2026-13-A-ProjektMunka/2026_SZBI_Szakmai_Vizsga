import app from '../app.js';

// stripe route kezelése.
// http://localhost:3500/api/stripe
import stripeRouter from '../../routes/stripeRoutes.mjs';
app.use('/api/stripe', stripeRouter);
