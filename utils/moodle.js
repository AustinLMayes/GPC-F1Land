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

module.exports = Moodle
