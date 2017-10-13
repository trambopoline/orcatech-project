<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

  $arr_data = array(); // create empty array

  function get()
  {
    $itemsFile = new \stdClass();
    $myFile = "items.json";

    $itemsFile = file_get_contents($myFile);

    return $itemsFile;
  }

	function delete()
  	{
    	$items = new \stdClass();
    	$myFile = "items.json";

   		$items = json_decode( file_get_contents($myFile), true );

   		// $neededItems = array_filter(
   		//     $items,
   		//     function ($e)
   		//     {
   		//     	echo json_encode( $e->id != 26);
   		//         // return $e->ID != 26;
   		//     }
   		// );

   		// echo $neededItems;
   		// foreach ($itemsFile as $key => $value)
   		// {
   		//     if (in_array('varnish', $value)) {
   		//     	echo in_array('varnish', $value);
   		//         // unset($itemsFile[$key]);
   		//         return "Removed successfully";
   		//     }
   		// } 
   		foreach ($items as $key => $value )
   		{
 			// echo $key[ID];
 			if( $key["ID"] == 4 )
 			{
				unset($items[$key]);
				echo "YES";
 			}
   		}

   		echo json_encode($items);
		return "Remove failed";

  	}

  function post()
  {
  	$itemsFile = new \stdClass();
  	$myFile = "items.json";

      try
      {
      		$formdata = array(
      		"ID" => $_GET['ID'] ?? '',
      	    "name" => $_GET['name'] ?? '',
      	    "model" =>$_GET['model'] ?? '',
      	    "macAddress" => $_GET['macAddress'] ?? '');

    	   //Get data from existing json file
    	   $jsondata = file_get_contents($myFile);

    	   // converts json data into array
    	   $arr_data = json_decode($jsondata, true);

    	   // Push user data to array
    	   array_push($arr_data,$formdata);

           //Convert updated array to JSON
    	   $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);

    	   //write json data into data.json file
    	   if(file_put_contents($myFile, $jsondata)) {
    	        return 'Data successfully saved';
    	    }
    	   else
    	        return "error";

       }
       catch (Exception $e)
       {
       	$errorMessage = 'Caught exception: ' . $e->getMessage() . "\n";
        return $errorMessage;
       }
  }

$get_urls = array("get", "retrieve");
$post_urls = array("post", "place");
$delete_urls = array("delete", "remove");

$value = "NOTHING";

if (isset($_GET["action"]) && in_array($_GET["action"], $get_urls))
{
	$value = get();
}
else if (isset($_GET["action"]) && in_array($_GET["action"], $post_urls))
{
    $value = post();
}
else if (isset($_GET["action"]) && in_array($_GET["action"], $delete_urls))
{
    $value = delete();
}

exit($value);

?>