const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    jarat: {
      type: String,
      required: true,
    },
    induloallomas: {
      type: String,
      required: true,
    },
    celallomas: {
      type: String,
      required: true,
    },
    ar: {
      type: Number,
      required: true,
    },
    allomasok: [
      {
        type: String,
        required: true,
      },
    ],
    idotartamAllomasig: [
      {
        type: String,
        required: true,
      },
    ],
    idopontok: [
      {
        type: String,
        required: true,
      },
    ],
    kedvezmeny: [
      {
        type: String,
        required: true,
      },
    ],
    kortablak: [
      {
        type: String,
        required: true,
      },
    ],
    idotartam: {
      type: String,
      required: true,
    },
    klima: {
      type: String,
      default: false,
    },
    helyjegy: {
      type: String,
      default: false,
    },
    kepek: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const ScheduleModel = mongoose.model("schedule", scheduleSchema);

module.exports = ScheduleModel;
