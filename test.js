	if (!('webkitSpeechRecognition' in window)) {
	    //handle error stuff here...
	} else {
	    var recognition = new webkitSpeechRecognition();
	    recognition.continuous = false;
	    recognition.interimResults = true;

	    recognition.start();

	    var final_transcript = '';

	    recognition.onresult = function (event) {
            console.log(JSON.stringify(event.results));
	        var interim_transcript = '';
	        if (typeof (event.results) == 'undefined') {
	            recognition.onend = null;
	            recognition.stop();
	            upgrade();
	            return;
	        }
	        for (var i = event.resultIndex; i < event.results.length; ++i) {
	            if (event.results[i].isFinal) {
	                final_transcript += event.results[i][0].transcript;
	            } else {
	                interim_transcript += event.results[i][0].transcript;
	            }
	        }
	        document.querySelector('.header')[0].innerText = final_transcript;
            
            
	    };
        
        recognition.onend = function () {
           recognition.start();
        }

        recognition.onend = function () {
           recognition.start();
        }

	}