/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Calendar  = require('../../app/models/calendar'),
    dbConnect = require('../../app/lib/mongodb'),
    setCred   = require('../../app/lib/oauth'),
    cp        = require('child_process'),
    calId     = 'hackspacescheduler@gmail.com',
    db        = 'scheduler-test';

describe('Calendar', function(){
  before(function(done){
    dbConnect(db, function(){
      setCred(function(){
        done();
      });
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Calendar object', function(){
      var c = new Calendar();
      expect(c).to.be.instanceof(Calendar);
    });
  });

  describe('.all', function(){
    it('should get all the user\'s calendars', function(done){
      Calendar.all(function(err, calendars){
        expect(calendars).to.have.length(2);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a calendar by it\'s calendar id', function(done){
      Calendar.findById(calId, function(err, calendar){
        expect(calendar).to.be.ok;
        done();
      });
    });
  });

  describe('.isAuthValid', function(){
    it('should check if current oAuth token is expired', function(){
      expect(Calendar.isAuthValid).to.equal(true);
    });
  });

  describe('#events', function(){
    it('should return the events associated with a calendar', function(done){
      Calendar.findById(calId, function(err, calendar){
        calendar.events(function(err, events){
          expect(events).to.be.ok;
          done();
        });
      });
    });
  });

});


