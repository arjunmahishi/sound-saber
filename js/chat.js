var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();


//// Send message to database //// 
const sendMessage = ( sender, reciever, message) => {  
    var info = database.ref("/messages");
    info.push({ 
	    sender: sender,
	    reciever: reciever,
	    message: message
	})
}


//// Listen to messages from database  //// 
database.ref("/calls/callID/messages/").on('child_added', (data) => {
    // Create chat bubbles 
});


//// Microphone controls //// 
const startListening = () => recognition.start();
const stopListening = () => recognition.stop();

recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if(!mobileRepeatBug) sendMessage("me", "him", transcript);

};

recognition.onstart = function() { 
    console.log("Started recording!")
}

recognition.onend = function() {
    recognition.start();
}

recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
    };
}


//// Text to speech ////
const speak = (message) => {
	var speech = new SpeechSynthesisUtterance();
	speech.text = message;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;
  
	window.speechSynthesis.speak(speech);
}