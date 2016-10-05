var mongoose = require('mongoose'),
    User = require('../models/user');

var connStr = 'mongodb://mongo/myapp';

mongoose.connect(connStr, function(err) {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
});

// save user to database
var addUser = function() {
    // create a user a new user
    var testUser = new User({
        username: 'jmar777',
        password: 'Password123',
        email: 'jmar@abc.com'
    })

    testUser.save(function(err) {
        if (err) return console.log(err);
        console.log('test user saved Successfully');

        // fetch user and test password verification
        User.findOne({ username: 'jmar777' }, function(err, user) {
            if (err) throw err;

            // test a matching password
            user.comparePassword('Password123', function(err, isMatch) {
                if (err) throw err;
                console.log('Password123:', isMatch); // -&gt; Password123: true
            });

            // test a failing password
            user.comparePassword('123Password', function(err, isMatch) {
                if (err) throw err;
                console.log('123Password:', isMatch); // -&gt; 123Password: false
            });
        });

    });

};

module.exports = addUser;
