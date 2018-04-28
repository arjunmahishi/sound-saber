var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();


//// Microphone controls //// 
const startListening = () => recognition.start();
const stopListening = () => recognition.stop();

recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if(!mobileRepeatBug) {
        // Handle the recognised text
    }

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