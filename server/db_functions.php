<?php
 
class DB_Functions {
 
    private $db;
 
    //put your code here
    // constructor
    function __construct() {
        include_once './db_connect.php';
        // connecting to database
        $this->db = new DB_Connect();
        $this->db->connect();
    }
 
    // destructor
    function __destruct() {
         
    }
 
    /**
     * Storing new user
     * returns user details
     */
    public function storeUser($driverid, $password, $gcm_regid) {
        // insert user into database
        $result = mysql_query("INSERT INTO gcm_users(driverid, password, gcm_regid, created_at) VALUES('$driverid', '$password', '$gcm_regid', NOW())");
        // check for successful store
        if ($result) {
            // get user details
            $id = mysql_insert_id(); // last inserted id
            $result = mysql_query("SELECT * FROM gcm_users WHERE id = $id") or die(mysql_error());
            // return user details
            if (mysql_num_rows($result) > 0) {
                return mysql_fetch_array($result);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
 
    public function userexist($driverid){
        $result = mysql_query("SELECT * FROM gcm_users WHERE driverid = '$driverid'");

        $num_results = mysql_num_rows($result); 
        if ($num_results > 0){ return true;}else{return false;} 
    }

    public function updateUser($driverid, $password, $gcm_regid) {
        $result = mysql_query("UPDATE gcm_users SET gcm_regid='$gcm_regid', created_at=NOW() WHERE driverid='$driverid'" );
        // check for successful store
        if ($result) {
            // get user details
            $result = mysql_query("SELECT * FROM gcm_users WHERE driverid='$driverid'") or die(mysql_error());
            // return user details
            if (mysql_num_rows($result) > 0) {
                return mysql_fetch_array($result);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function deleteUser($driverid){
        $result = mysql_query("UPDATE gcm_users SET gcm_regid='0', password='0', created_at=NOW() WHERE driverid='$driverid'" );
        // check for successful store
        if ($result) {
            // get user details
            $result = mysql_query("SELECT * FROM gcm_users WHERE driverid='$driverid'") or die(mysql_error());
            // return user details
            if (mysql_num_rows($result) > 0) {
                return mysql_fetch_array($result);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function delregid($gcm_regid){
       $result = mysql_query( "UPDATE gcm_users SET gcm_regid='0', created_at=NOW() WHERE gcm_regid='$gcm_regid'" );
    }


    public function delregid_byuser($driverid){
       $result = mysql_query( "UPDATE gcm_users SET gcm_regid='0', created_at=NOW() WHERE driverid='$driverid'" );
    }

    public function finduserbyregid($gcm_regid){
        $result = mysql_query("SELECT * FROM gcm_users WHERE gcm_regid='$gcm_regid'") or die(mysql_error());
        if (mysql_num_rows($result) > 0) {
            $arowofresult = mysql_fetch_array($result);
            return $arowofresult["driverid"];
        } else {
            return 0;
        }
    }

  public function findregidbyuser($driverid){
        $result = mysql_query("SELECT * FROM gcm_users WHERE driverid='$driverid'") or die(mysql_error());
        if (mysql_num_rows($result) > 0) {
            $arowofresult = mysql_fetch_array($result);
            return $arowofresult["gcm_regid"];
        } else {
            return 0;
        }  
  }

    /**
     * Getting all users
     */
    public function getAllUsers() {
        $result = mysql_query("select * FROM gcm_users");
        return $result;
    }
 
}
 
?>