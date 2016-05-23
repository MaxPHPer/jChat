<?php
	// clear data
	function clearData($filePath){
		$chatLog = fopen($filePath, "a") or die("Unable to open file!");
		ftruncate($chatLog, 0);
		fclose($chatLog);
		return 'done';
	}

	// invoke clear data
	$clear = clearData('../chat.log');
	echo $clear;
?>