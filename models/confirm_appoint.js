'use strict';

const mongoose = require('mongoose');
const moment = require('moment');

const AppointmentSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    notification: Number,
    timeZone: String,
    time: {type: Date, index: true},
    status:String,
  });
  
  const confirm_Appointment = mongoose.model('confirm_appointment', AppointmentSchema);
module.exports = confirm_Appointment;