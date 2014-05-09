<?php
if (isset($_GET["regId"]) && isset($_GET["message"])) {
    $regId = $_GET["regId"];
    $message = $_GET["message"];
     
    include_once './gcm.php';
     
    $gcm = new GCM();
 
    $registatoin_ids = array($regId);
    $message = array("message" => $message,
		     "title" => "Oceanex Dispatch Update",
               //"msgcnt"=>"3" 
               //"soundname" => "beep.wav"
     );
 
    $result = $gcm->send_notification($registatoin_ids, $message);
 
    echo $result;
}
?>