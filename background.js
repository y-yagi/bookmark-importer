var config = {
  apiKey: "AIzaSyDyKcKgz_bST086H9VEHAZPY37ZXq3K2DE",
  databaseURL: "https://yy-apps.firebaseio.com",
  storageBucket: "",
};
firebase.initializeApp(config);

function initApp() {
  // Listen for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('User state change detected from the Background script of the Chrome Extension:');
  });
}

window.onload = function() {
  initApp();
};
