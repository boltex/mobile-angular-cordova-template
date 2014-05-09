<?php
 
// response json
$json = array();
 $data   = array();  
/**
 * Registering a user device
 * Store reg id in users table
 */
if (isset($_POST["driverid"]) && isset($_POST["password"]) && isset($_POST["regId"])) {
    $driverid = $_POST["driverid"];
    $password = $_POST["password"];
    $gcm_regid = $_POST["regId"]; // GCM Registration ID
    // Store user details in db
    include_once './db_functions.php';
    include_once './gcm.php';
 
    $db = new DB_Functions();
    $gcm = new GCM();


$phonetologoff = $db->findregidbyuser($driverid);
  error_log( "phone to log off:".$phonetologoff."  redid sent : ".$gcm_regid." boolvalue : ",0);
    error_log( (strcmp( $phonetologoff ,$gcm_regid )!==0) , 0);
if($phonetologoff && (strcmp( $phonetologoff ,$gcm_regid )!==0) ){
    error_log( "sent logoff ",0);
        $registation_ids = array($phonetologoff);
        $message = array(   "message" => "Logged Out",
                            "title" => "You have been logged out");
        $result = $gcm->send_notification($registation_ids, $message);
}

/*    $usertologoff = $db->finduserbyregid($gcm_regid);
    if( strcmp ($usertologoff, $driverid) &&  $usertologoff  ) {
        $registation_ids = array($gcm_regid);
        $message = array(   "message" => "Logged Out",
                            "title" => "You have been logged out");
        $result = $gcm->send_notification($registation_ids, $message);
    }   */

    $db->delregid($gcm_regid); // DELETE IF REGID EXISTS : a new driver has that phone
 
    if( $db->userexist($driverid)){
         $res = $db->updateUser($driverid, $password, $gcm_regid);
    }else{
        $res = $db->storeUser($driverid, $password, $gcm_regid);
    }
 
    //echo $result;
    $data['message'] = 'Logged In';
} else {
    // user details missing
    $data['message'] = 'error';
}

echo json_encode($data);
?>