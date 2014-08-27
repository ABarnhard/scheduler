/* jshint camelcase:false */

'use strict';

var google = require('googleapis'),
    cal    = google.calendar('v3'),
    _      = require('lodash');

function Calendar(){
}

Object.defineProperty(Calendar, 'collection', {
  get: function(){return global.mongodb.collection('calendars');}
});

Object.defineProperty(Calendar, 'auth', {
  get: function(){return global.auth;}
});

Object.defineProperty(Calendar, 'isAuthValid', {
  get: function(){
    var now = new Date().getTime();
    return Calendar.auth.credentials.expiry_date > now;
  }
});

Calendar.all = function(cb){
  cal.calendarList.list({auth:Calendar.auth}, function(err, calendars){
    if (err){
      console.log('An error occured .all', err);
      return;
    }
    //console.log('Calendar List:', calendars);
    cb(err, calendars.items);
  });
};

Calendar.findById = function(id, cb){
  cal.calendarList.get({auth:Calendar.auth, calendarId:id}, function(err, obj){
    if (err){
      console.log('An error occured .findById', err);
      return;
    }
    //console.log('Calendar:', calendar);
    var calendar = _.create(Calendar.prototype, obj);
    cb(err, calendar);
  });

};

Calendar.refreshAuth = function(cb){
  Calendar.auth.refreshAccessToken(cb);
};

Calendar.prototype.events = function(cb){
  cal.events.list({auth:Calendar.auth, calendarId:this.id}, function(err, events){
    if (err){
      console.log('An error occured #events', err);
      return;
    }
    // console.log('Events:', events);
    cb(err, events);
  });
};

module.exports = Calendar;


