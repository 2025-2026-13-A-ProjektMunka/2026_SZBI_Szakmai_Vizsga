import app from '../app.js';

// user route kezelése.
// http://localhost:3500/api/user
import userRouter from '../../routes/userRoutes.mjs';
app.use('/api/user', userRouter);
