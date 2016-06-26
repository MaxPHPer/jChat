// --------- # GLOBAL OBJECTS --------- //

// input value
var $input = $('#input');

// user name
var $user = $('#username-input');

// --------- # EVENT CONTROLS --------- //

// initialize data sync
syncData();

// sync data
function syncData(){
	setTimeout(function(){ 
		getData('chat.log?' + Math.random());
	}, 2000);
}

// post data
$(document).keypress(function(key){	
	if(key.which === 13 && $input.val() !== ""){
		if($user.val() === ""){
			return $('#chat').append('<p>*Username Required</p>')
				.scrollTop($('#chat').prop("scrollHeight"), 0);	
		}		
		else if($user.val() !== "" && $input.val() == "~clear"){
			$input.val('');	
			return postData('php/clear.php');
		}
		else {
			var data = '<p>' + '<b>' + $user.val() + '</b>' + ': ' + $input.val() + '</p>';
			$('#chat').append(data);
			postData('php/send.php', data); 		
			console.log('sent message: ' + $input.val());
			$input.val('');	
			$('#chat').scrollTop($('#chat').prop("scrollHeight"), 0);
			key.preventDefault();	
		}
	}
});

// --------- # DATA CONTROLS --------- //

// post data
function postData(url, data){
	$.ajax({
		url: url,
		type: 'POST',
		data: {
			'data': data
		},
		success: function(data){
			console.log('POST success!')	
		}
	});		
}

// get data
function getData(url){	
	$.ajax({
		url: url,
		type: 'GET',
		success: function(data){
			$('#chat').html(data);
			console.log('GET success!')
			$('#chat').scrollTop($('#chat').prop("scrollHeight"), 0);
			syncData();
		}
	});
}