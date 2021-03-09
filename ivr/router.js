/*const Router = require('express').Router;
const {welcome, menu, clientInput} = require('../ivr/handler');
const router = new Router();
const express = require('express');

const Appointment = require('../models/appointment')

// POST: /ivr/welcome
router.post('/welcome', (req, res) => {
  res.send(welcome());
});

// POST: /ivr/menu
router.post('/menu', (req, res) => {
  const digit = req.body.Digits;
  return res.send(menu(digit));
  
});

router.post('/clientInput', (req, res) => {
  const digit = req.body.Digits;
  
  if (digit==1){
    
    
     const appointment =new Appointment({status: 'confirmed',});
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
*/