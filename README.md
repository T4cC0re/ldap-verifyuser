# ldap-verifyuser

## What is `ldap-verifyuser`?

`ldap-verifyuser` is a node.js library based on [ldapjs](http://ldapjs.org/), that authenticates a user against a LDAP or AD without requiring an configured administrator account (which is required by MANY other implementations). This is done, by using the userprovided credentials itself to bind against the LDAP and verify the account's status.

## How does it work?

One possible implementation of this lib would be:
```javascript
var lib = require('ldap-verifyuser');

var config = {
  server: 'ldap://<ip>',
  adrdn: 'MYCORP\\',
  adquery: 'dc=MYCORP,dc=LOCAL',
  debug: false,
  rawAdrdn: false
},
username = 'myacc',
password = 'mypass'

lib.verifyUser(config, username, password, function(err, data){
  if(err) {
    console.error('error', err);
  } else {
    console.log('valid?', data.valid);
    console.log('locked?', data.locked);
    console.log('raw data available?', data.raw ? true : false);
  }
  process.exit(data.status);
});
```

Set `config.rawAdrdn` to `true` to use the supplied `adrdn` without modifications/appending the username.

## Installation

To install you need to:

 - Perform a `npm install ldap-verifyuser`
 - You're done!

(You will need [>node.js<](https://nodejs.org/) of course)


## Here be dragons!

This is the first inital version and will have rough edges, so please keep that in mind.
Thus: 'here be dragons!'.

Temporarily i use my hotfixed version of ldapjs to make it compatible with node 0.12.x. Whenever a new upstream version of the official ldapjs is available i will switch back to it.
