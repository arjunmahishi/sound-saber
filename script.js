try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  // $('.no-browser-support').show();
  // $('.app').hide();
}


var config = {
  apiKey: "AIzaSyAJQaVysxwNwEcytdDm-CULQqC998s3PVo",
  authDomain: "learn1-d280c.firebaseapp.com",
  databaseURL: "https://learn1-d280c.firebaseio.com",
  projectId: "learn1-d280c",
  storageBucket: "learn1-d280c.appspot.com",
  messagingSenderId: "708667620662"
};

firebase.initializeApp(config);
var database=firebase.database();

//// methods ////
const startListening = () => recognition.start();
const stopListening = () => recognition.stop();

const sendMessage = ( sender, reciever, message) => {  
    var info=database.ref("/messages");
    info.push({ 
	    sender: sender,
	    reciever: reciever,
	    message: message
	})
}

//// Voice Recognition //// 
// recognition.continuous = false;
// recognition.interimResults = true;

recognition.onresult = function(event) {

  // console.log(event)

  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;

  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    // $(".header").html(transcript);
    sendMessage("me", "him", transcript)

  }
};

recognition.onstart = function() { 
  console.log("Started recording!")
}

recognition.onend = function() {
  // console.log("Stopped");
  // $(".header").html("");
  recognition.start();
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
  };
}

//// tts ////
const speak = (message) => {
	var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
	speech.text = message;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;
  
	window.speechSynthesis.speak(speech);
}


window.onload = () => {
  startListening();
}

database.ref("/messages").on('child_added', (data) => {
    document.querySelector(".header").innerHTML += `<br /> * ${data.val().message}`;  
});