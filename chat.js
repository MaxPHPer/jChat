// --------- # OBJECT MODEL --------- //

// input value
var $input = $('#input');

// user name
var $user = $('#name');

// --------- # OBJECT CONTROLLER --------- //

// refresh chat messages
(function refreshChat(){
	loadMessages('chat.log');
	setInterval(function(){ 
		loadMessages('chat.log');
	}, 3000);
})();

// send message with keypress
$(document).keypress(function(key){	
	if(key.which === 13 && $input.val() !== ""){
		if($user.val() === ""){
			return $('#chat').append('<p>*Username Required</p>')
				.scrollTop($('#chat').get(0).scrollHeight);	
		}		
		var userMessage = '<p>' + '<b>' + $user.val() + '</b>' + ': ' + $input.val() + '</p>';
		$('#chat').append(userMessage);
		sendMessage('send.php', userMessage); 
		console.log('sent message: ' + $input.val());
		$input.val('');
		$('#chat').scrollTop($('#chat').get(0).scrollHeight);				
		key.preventDefault();
	}
});

// send message with button
$('#send').click(function(){
	if($user.val() === ""){
		return $('#chat').append('<p>*Username Required</p>')
			.scrollTop($('#chat').get(0).scrollHeight);		
	}		
	var userMessage = '<p>' + '<b>' + $user.val() + '</b>' + ': ' + $input.val() + '</p>';
	$('#chat').append(userMessage);
	sendMessage('send.php', userMessage); 
	console.log('sent message: ' + $input.val());
	$input.val('');
	$('#chat').scrollTop($('#chat').get(0).scrollHeight);		
});

// --------- # DATA CONTOLLER --------- //

// submit chat message
function sendMessage(url, messageValue){
	$.ajax({
		url: url,
		type: 'POST',
		data: {
			'message': messageValue
		},
		success: function(data){
			console.log(data + ' POST success!')
		}
	});		
}

// load chat messages from database
function loadMessages(url){	
	$.ajax({
		url: url,
		dataType: 'text',
		success: function(data){
			$('#chat').html(data);
		}
	});
	console.log('chat refreshed!');
	$('#chat').scrollTop($('#chat').get(0).scrollHeight);		
}