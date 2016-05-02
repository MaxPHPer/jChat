<?php
	// cache POST data
	$message = $_REQUEST['message'];
	
	// write data to database
	function writeData($filePath, $data){
		$data = PHP_EOL . $data;
		$chatLog = fopen($filePath, "a") or die("Unable to open file!");
		fwrite($chatLog, $data);
		fclose($chatLog);
		return 'done';
	}

	// write data
	$write = writeData('chat.log', $message);
	echo $write;
?>