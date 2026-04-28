import dotenv from 'dotenv';
dotenv.config();

import path from 'node:path';
import cors from 'cors';
import ejs from 'ejs';
import express from 'express';

export const PORT = process.env.PORT || 3500;
const app = express();

const dir = import.meta.dirname;
app.use(express.static(path.resolve(dir, '..', 'public')));
app.set('view engine', ejs);
app.use(express.json());
app.use(cors());

export default app;