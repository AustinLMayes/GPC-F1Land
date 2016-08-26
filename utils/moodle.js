var moodle_client = require("moodle-client");
var moodle;


function Moodle(config) {
  moodle = moodle_client.init({
      wwwroot: config["base"],
      token: config["token"]
  })
}

Moodle.prototype.user_exists = function (email, callback) {
  moodle.then(function(client) {
    client.call({
         wsfunction: "core_user_get_users",
         method: "POST",
         args: {
            criteria: [
               {
                  key: "email",
                  value: email
                }
            ]
        }

     }).then(function(info) {
        callback(info.users.length >= 1);
     });


  }).catch(function(err) {
      console.log("Unable to initialize the client: " + err);

      callback(false);
  });
}

/**
 * Create a moodle user
 * @param user_data (Hash) -
            username => string
            password => string
            firstname => string
            lastname => string
            email => string
            auth => string
            lang => string
            timezone => string
            mailformat => int
            description => string
            country => string
            middlename => string
 * @param callback Callback to run a request completion.
 */
Moodle.prototype.core_user_create_users = function (user_data, callback) {
  moodle.then(function(client) {
    client.call({
         wsfunction: "core_user_get_users",
         method: "POST",
         args: {
            users: [
               user_data
            ]
        }

     }).then(function(info) {
        callback(true);
     });


  }).catch(function(err) {
      console.log("Unable to create user: " + err);

      callback(false);
  });
}

module.exports = Moodle
