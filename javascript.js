// ./public/javascript.js
// Get the current username from the cookies
var user = cookie.get('user');

if (!user) {
  // Ask for the username if there isn't one already set
  user = prompt('Choose a username:');

  if (!user) {
    alert('We cannot work with you like that!');
  } else {
    // Store it in the cookies for future use
    cookie.set('user', user);
  }
}

var socket = io();

// The user count (can change when someone joins/leaves)
socket.on('count', function (data) {
  $('.user-count').html(data);
});

// When we receive a message (user: 'username', message: 'text')
socket.on('message', function (data) {
  $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
});

// When the form is submitted
$('form').submit(function (e) {
  // Avoid submitting via HTTP
  e.preventDefault();

  // Retrieve the message from the user
  var message = $(e.target).find('input').val();

  // Send the message to the server
  socket.emit('message', { user: cookie.get('user') || 'Anonymous', message: message });

  // Clear the input and focus on it for a new message
  e.target.reset();
  $(e.target).find('input').focus();
});
