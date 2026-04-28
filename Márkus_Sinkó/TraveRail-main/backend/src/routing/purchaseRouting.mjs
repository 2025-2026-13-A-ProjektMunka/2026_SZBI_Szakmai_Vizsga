import app from '../app.js';

// purchase route kezelése.
// http://localhost:3500/api/purchase
import purchaseRouter from '../../routes/purchaseRoutes.mjs';
app.use('/api/purchase', purchaseRouter);
