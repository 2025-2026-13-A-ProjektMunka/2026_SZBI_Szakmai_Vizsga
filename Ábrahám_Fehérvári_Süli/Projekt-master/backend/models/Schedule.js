const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: String,
  sets: Number,
  reps: String,
  notes: String,
}, { _id: false });

const daySchema = new mongoose.Schema({
  dayName: String,
  exercises: [exerciseSchema],
}, { _id: false });

const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  days: [daySchema],
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
