var provider = new firebase.auth.GoogleAuthProvider();

const login = () => {
	firebase.auth().signInWithRedirect(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  var user = result.user;
		console.log(user);
	  // ...
	}).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  var email = error.email;
	  var credential = error.credential;
		console.log(errorMessage);
	});

	firebase.auth().getRedirectResult().then(function(result) {
	  if (result.credential) {
	    // This gives you a Google Access Token. You can use it to access the Google API.
	    var token = result.credential.accessToken;
	    // ...
			// window.location = "/profile/";
	  }
	  // The signed-in user info.
	  var user = result.user;
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
		console.log(errorMessage);
	});

}

const logout = () => {
	firebase.auth().signOut();
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("Logged in as", user);
		//// Register user on the database ////
		firebase.database().ref(`/users/${user.uid}`).set({
			uid: user.uid,
			email: user.email,
			name: user.displayName,
			photo: user.photoURL
		}).then(() => {
			localStorage['me'] = JSON.stringify({
			uid: user.uid,
			email: user.email,
			name: user.displayName,
			photo: user.photoURL
		})
			window.location = "contacts.html";
		})
  } else {
    console.log("didn't work");
  }
});