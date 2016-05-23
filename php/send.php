<?php
	// cache data
	$message = $_REQUEST['data'];
	
	// write data
	function writeData($filePath, $data){
		$data = PHP_EOL . $data;
		$chatLog = fopen($filePath, "a") or die("Unable to open file!");
		fwrite($chatLog, $data);
		fclose($chatLog);
		return 'done';
	}

	// invoke write data
	$write = writeData('../chat.log', $message);
	echo $write;
?>