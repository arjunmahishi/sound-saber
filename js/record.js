var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

var flag = true;
var recordFlag = true;

//// Microphone controls //// 
const startListening = () => {
    recordFlag = true;
    recognition.start();
}
const stopListening = () => {
    recordFlag = false;
    recognition.stop();
}

const toggle = () => {
    if (flag) {
        startListening();
        $("#rec-btn").html("Stop");
        flag = false
    }
    else{
        stopListening();
        $("#rec-btn").html("Record")  
        flag = true  
    } 
}

recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if(!mobileRepeatBug) {
        document.querySelector("#subtitle").value += "\n" + transcript;
    }

};

recognition.onstart = function() { 
    console.log("Started recording!")
}

recognition.onend = function() {
    if(recordFlag) recognition.start();
}

recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
    };
}