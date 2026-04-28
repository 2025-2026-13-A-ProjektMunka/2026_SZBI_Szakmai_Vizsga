import app from '../app.js';

// main route kezelése.
// http://localhost:3500/api
import mainRouter from '../../routes/mainRoutesBackend.mjs';
app.use('/api', mainRouter);
