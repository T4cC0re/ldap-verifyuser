#!/usr/bin/env node

/* ldap-verifyuser
 *
 * Copyright (C) 2015 Hendrik 'Xendo' Meyer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

module.exports = {

  verifyUser: function (config, username, password, callback){

	  var client = require("ldapjs").createClient({url: config.server, tlsOptions: config.tlsOptions || {}});

	  client.bind(config.adrdn + username, password, function(err) {
	    if(!err){
	      if(config.debug){console.log("bound with user's credentials");}
	      var opts = {
		      filter: '(&(sAMAccountName=' + username + '))',
		      scope: 'sub'
	      }
	      client.search(config.adquery, opts, function(err, res){
		      var data = {
		        raw: null,
		        valid: false,
		        locked: true
		      }
		      res.on('searchEntry', function(entry) {
		        data.raw = entry.object;
		        data.valid = true;
		        if (Number(entry.object.lockoutTime) == 0){
		          if(config.debug){console.log("account not locked and valid!");}   
		          data.locked = false;       
		        }
		      });
		      res.on('error', function(err) {
		        if(config.debug){console.error(error, err.message);} 
		        callback(err, {status: 1});         
		      });
		      res.on('end', function(result) {
		        if(config.debug){console.log('status: ' + result.status);} 
		        callback(null, data);
		      });
		      if(err){ 
		        callback(err, {status: 1});          
		      }
	      });
	    } else {
	      if(config.debug){console.error(error, err.message);}  
	      callback(err, {status: 1});         
	    }
	  });
  }
}
