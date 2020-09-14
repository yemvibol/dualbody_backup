var speech_count = 0;
document.getElementById("start_recognition").onclick = function vr_function() {
	
	var result_text = document.getElementById('result_text');
	while (result_text.firstChild) {
		result_text.removeChild(result_text.firstChild);    
	}
	SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
	const recognition = new SpeechRecognition();
	recognition.lang = 'en-US';
	recognition.interimResults = true;
	recognition.continuous = true;
	recognition.onresult = function(event) {
	var results = event.results;
		if (document.getElementById('interim_result') == null) {
			var interim = document.createElement('d' + 'iv');
			interim.setAttribute('class', 'results');
			interim.setAttribute('id', 'interim_result');
			document.getElementById('result_text').appendChild(interim);
		}
		for (var i = event.resultIndex; i < results.length; i++) {
			if (results[i].isFinal) {
				speech_count++;
				result_line = "<font size='4'>" + results[i][0].transcript + "</font>";
				document.getElementById('interim_result').innerHTML = result_line;
				document.getElementById('interim_result').setAttribute('id', 'result' + speech_count);

				<!--document.getElementById('search_param').setAttribute('value', results[i][0].transcript); -->
				<!--document.googleform.submit(); -->
                document.getElementById('getresult').innerHTML = results[i][0].transcript;
				document.getElementById('status').innerHTML = "Speech recognized! If it is not working click Start talking!";
				sendSpData();
				var element = document.getElementById("listTalk");
				element.scrollTop = element.scrollHeight;
				<!--document.getElementById("senddata").click(); -->
				<!--not yet finished speaking-->
				<!--recognition.stop();-->
				<!--return-->;
			} else {
				document.getElementById('interim_result').innerHTML = "<font size='4' color='gray'>" + results[i][0].transcript + "</font>";
				flag_speech = 1;
				<!--not yet finished speaking-->
				document.getElementById('status').innerHTML = results[i][0].transcript;
			}
		}
        
	}
    document.getElementById('status').innerHTML = "status: recognizing... If it does not work click start again.";
    recognition.start();
}
