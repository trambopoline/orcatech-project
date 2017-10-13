<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");


$itemsFile = new \stdClass();
$myFile = "items.json";

$itemsFile = file_get_contents($myFile);

// $myJSON = json_encode($itemsFile);

// echo $myJSON;
echo $itemsFile;



$arr_data = array(); // create empty array

  try
  {
	   //Get form data
	   // $formdata = array(
	   //    'ID'=> $_POST['ID'] ?? '',
	   //    'name'=> $_POST['name'] ?? '',
	   //    'model'=>$_POST['model'] ?? '',
	   //    'macAddress'=> $_POST['macAddress'] ?? ''
	   // );

  	$formdata = @json_decode(($stream = fopen('php://input', 'r')) !== false ? stream_get_contents($stream) : "{}");


	   //Get data from existing json file
	   // $jsondata = file_get_contents($myFile);

	   // converts json data into array
	   $arr_data = json_decode($itemsFile, true);

	   // Push user data to array
	   // array_push($arr_data,$formdata);
	   array_push($arr_data,$formdata);

       //Convert updated array to JSON
	   $itemsFile = json_encode($arr_data, JSON_PRETTY_PRINT);

	   //write json data into data.json file
	   if(file_put_contents($myFile, $itemsFile)) {
	        echo 'Data successfully saved';
	    }
	   else
	        echo "error";

   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }
?>