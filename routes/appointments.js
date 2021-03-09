'use strict';

const express = require('express');
const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const Appointment = require('../models/appointment');
const ivrRouter =  require('../ivr/router')
const twilio = require('twilio');
const Router = require('express').Router;
const Appoint = require('../models/confirm_appoint')

const {welcome, menu, clientInput} = require('../ivr/handler');

const router = new Router();


const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

// GET: /appointments
router.get('/', function(req, res, next) {
  Appointment.find()
    .then(function(appointments) {
      res.render('appointments/index', {appointments: appointments});
    });
});


// GET: /appointments/create
router.get('/create', function(req, res, next) {
  res.render('appointments/create', {
    timeZones: getTimeZones(),
    appointment: new Appointment({name: '',
                                  phoneNumber: '',
                                  notification: '',
                                  timeZone: '',
                                  time: ''})});
});

// POST: /appointments
router.post('/', function(req, res, next) {
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

  const appointment = new Appointment({name: name,
                                       phoneNumber: phoneNumber,
                                       notification: notification,
                                       timeZone: timeZone,
                                       time: time,
                                      });
  appointment.save()
    .then(function() {
      res.redirect('/');
    });
});

// GET: /appointments/:id/edit
router.get('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  Appointment.findOne({_id: id})
    .then(function(appointment) {
      res.render('appointments/edit', {timeZones: getTimeZones(),
                                       appointment: appointment});
    });
});

// POST: /appointments/:id/edit
router.post('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

  Appointment.findOne({_id: id})
    .then(function(appointment) {
      appointment.name = name;
      appointment.phoneNumber = phoneNumber;
      appointment.notification = notification;
      appointment.timeZone = timeZone;
      appointment.time = time;

      appointment.save()
        .then(function() {
          res.redirect('/');
        });
    });
});

// POST: /appointments/:id/delete
router.post('/:id/delete', function(req, res, next) {
  const id = req.params.id;

  Appointment.remove({_id: id})
    .then(function() {
      res.redirect('/');
    });
});

//////////////////////////////////////////////
router.post('/welcome', (req, res) => {
  res.send(welcome());
});

// POST: /ivr/menu
router.post('/menu', (req, res) => {
  const digit = req.body.Digits;
  return res.send(menu(digit));
  
});


router.post('/clientInput', function(req, res,next) {
  const digit = req.body.Digits;
  
  if (digit==1){
  const appointment = new Appointment({
                              name:Appointment.name,
                              phoneNumber:Appointment.phoneNumber,
                              status:"confirmed",
                              });
     console.log("digit");
  appointment.save()
    .then(function() {
      res.redirect('/');
    });
  }
  else if (digit==2) {
    console.log("re-scheducle");
    // POST: /appointments
  const name = digit;
    const appointment=new Appointment({status: 'Re-Scheducle',
                                       });
  appointment.save()
    .then(function() {
      res.redirect('/');
    });
  }
   else {
    console.log("hang up");
    // POST: /appointments
  const name = digit;
  const appointment = new Appointment({status: 'Not Answered',
                                       });
  appointment.save()
    .then(function() {
      res.redirect('/');
    });
   }
   console.log(digit);
  res.send(clientInput(digit));
  
});



module.exports = router;
