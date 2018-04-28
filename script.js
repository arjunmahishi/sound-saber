try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  // $('.no-browser-support').show();
  // $('.app').hide();
}

//// methods ////
const startListening = () => recognition.start();
const stopListening = () => recognition.stop();

//// Voice Recognition //// 
// recognition.continuous = false;
// recognition.interimResults = true;

recognition.onresult = function(event) {
  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;

  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    $(".header").html(transcript);
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