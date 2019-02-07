var config = {
  apiKey: "AIzaSyDyKcKgz_bST086H9VEHAZPY37ZXq3K2DE",
  projectId: "yy-apps"
};

if (typeof(firebase) === "undefined") {
  alert("Please sign-in first.");
  console.error("Please sign-in first.");
} else {
  firebase.initializeApp(config);
}

function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('User state change detected from the Background script of the Chrome Extension:');
  });
}

function onClickHandler(info, tab) {
  if (!firebase.auth().currentUser) {
    alert("Please sign-in first.");
    console.error("Please sign-in first.");
    return;
  }

  let db = firebase.firestore();
  let createdAt = new Date();

  db.collection("bookmarks").add({
    userId: firebase.auth().currentUser.uid,
    url: info.pageUrl,
    title: tab.title,
    createdAt: new Date()
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}

window.onload = function() {
  initApp();
};

chrome.contextMenus.onClicked.addListener(onClickHandler);
chrome.contextMenus.create({title: "Save to Bookmarker"});
