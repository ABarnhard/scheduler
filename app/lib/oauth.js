/* jshint camelcase:false */

'use strict';

var google = require('googleapis'),
    OAuth2Client = google.auth.OAuth2,
    credentials = require('../static/cred/credentials'),
    tokens = require('../static/cred/tokens');


function setCredentials(cb){
  var authClient = new OAuth2Client(credentials.clientId, credentials.clientSecret, credentials.redirectUrl);
  authClient.setCredentials(tokens);
  authClient.refreshAccessToken(function(){
    var now = new Date().getTime();
    console.log(authClient.credentials.expiry_date > now);
    global.auth = authClient;
    console.log('Google API Credentials Refreshed');
    cb();
  });
}

module.exports = setCredentials;

