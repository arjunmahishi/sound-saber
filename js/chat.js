var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var flag = true;
var toggleFlag = true;


const toggle = () => {
    if (toggleFlag) {
        toggleFlag = false;
        stopListening();
        $("#mic-control").html("Unmute")
    }else{
        toggleFlag = true;
        startListening();
        $("#mic-control").html("Mute")
    }
}

//// Send message to database //// 
const sendMessage = ( sender, reciever, message) => {  
    var info = database.ref("/calls/" + getCallID() + "/messages");
    info.push({ 
	    from: sender,
	    to: reciever,
	    message: message
	})
}

const sendText = () => {
    sendMessage( 
        getMyData().uid, 
        getRecieverData().uid, 
        $("#text-box").val()
    );
    $("#text-box").val("")
}

const getCallID = () => {

    let myUID = getMyData().uid;
    let theirUID = getRecieverData().uid; 

    if (theirUID > myUID) return theirUID + "__" + myUID;
    return myUID + "__" + theirUID
}


const getRecieverData = () => {
    return JSON.parse(localStorage['reciever'])
}

const getMyData = () => {
    return JSON.parse(localStorage['me'])
}

const showMyMessage = (message) => {
    document.querySelector("#messages").innerHTML += `
        <li class="list-group-item">
            <div class="message other-message float-right">${message}</div>
        </li>
    `;
}

const showTheirMessage = (message) => {
    document.querySelector("#messages").innerHTML += `
        <li class="list-group-item" >
            <div class="message my-message">${message}</div>
        </li>
    `;
}


//// Listen to messages from database  //// 
database.ref(`/calls/${getCallID()}/messages/`).on('child_added', (data) => {

    if(data.val().from == getMyData().uid) showMyMessage(data.val().message);
    else showTheirMessage(data.val().message);

    window.scrollTo(0,document.querySelector(".chat-history").scrollHeight);

});


//// Microphone controls //// 
const startListening = () => {
    flag = true;
    recognition.start();
}
const stopListening = () => {
    flag = false;
    recognition.stop();
}

recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if(!mobileRepeatBug) sendMessage( 
        getMyData().uid, 
        getRecieverData().uid, 
        transcript
    );

};

recognition.onstart = function() { 
    console.log("Started recording!")
}

recognition.onend = function() {
    if(flag) recognition.start();
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


//// main ////
window.onload = () => {
    let recData = getRecieverData();

    $("#rec-img").attr("src", recData.photo)
    $("#rec-name").html(recData.name)

    startListening()
}