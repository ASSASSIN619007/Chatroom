// /public/javascript.js
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
