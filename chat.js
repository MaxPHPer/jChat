// --------- # OBJECT MODELS --------- //

// input value
var $input = $('#input');

// user name
var $user = $('#name');

// --------- # EVENT CONTROLS --------- //

// initiate data sync
$(document).ready(function(){
	syncData();
});

// sync data
function syncData(){
	setTimeout(function(){ 
		getData('chat.log');
	}, 1000);
}

// post data with keypress event
$(document).keypress(function(key){	
	if(key.which === 13 && $input.val() !== ""){
		if($user.val() === ""){
			return $('#chat').append('<p>*Username Required</p>')
				.scrollTop($('#chat').get(-1).scrollHeight);	
		}		
		var data = '<p>' + '<b>' + $user.val() + '</b>' + ': ' + $input.val() + '</p>';
		postData('send.php', data); 
		console.log('sent message: ' + $input.val());
		$input.val('');	
		$('#chat').scrollTop($('#chat').prop("scrollHeight"), 0);
		key.preventDefault();	
	}
});

// post data with click event
$('#send').click(function(){
	if($user.val() === ""){
		return $('#chat').append('<p>*Username Required</p>')
			.scrollTop($('#chat').get(0).scrollHeight);		
	}		
	var data = '<p>' + '<b>' + $user.val() + '</b>' + ': ' + $input.val() + '</p>';
	postData('send.php', data); 
	console.log('sent message: ' + $input.val());
	$input.val('');
  $('#chat').scrollTop($('#chat').prop("scrollHeight"), 0);
});

// clear data with click event
$('#clear').click(function(){
	postData('clear.php'); 
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

// clear data
function clearData(url){
	$.ajax({
		url: url,
		type: 'POST',
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
		}
	});
	syncData();
}
