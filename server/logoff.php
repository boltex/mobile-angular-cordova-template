<?php
 
// response json
$json = array();
  $data   = array();  
/**
 * Registering a user device
 * Store reg id in users table
 */
if (isset($_POST["driverid"]) ) {
    $driverid = $_POST["driverid"];

    // Store user details in db
    include_once './db_functions.php';
    include_once './gcm.php';
 
    $db = new DB_Functions();
    $gcm = new GCM();
 
    if( $db->userexist($driverid) ){
         $res = $db->delregid_byuser($driverid);
           $data['message'] = 'deleted';
    }else{
          $data['message'] = 'deleted2';
    }
    //$registation_ids = array($gcm_regid);
    //$message = array("product" => "shirt");
    //$result = $gcm->send_notification($registation_ids, $message);

    //echo $result;
} else {
    // user details missing
    $data['message'] = 'error no driverid sent';
}

echo json_encode($data);
?>