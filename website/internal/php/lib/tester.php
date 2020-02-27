<?php
require_once(__DIR__."/base/class/FunctionParameter.php");
    /*require_once("Database.php");

    $db = new Database("pitt_course");

    $result = $db->execute("SELECT * FROsM subject WHERE id=? or id=?", "1","2","3");
    #$result = $db->execute("INSERT INTO tesst(id, test_field1) VALUES (?,?)", "1", "2");
    print_r($db->parseExecuteResult($result));*/

    require_once("Logger.php");

class testerClass
{
    public function test($test)
    {
        $l = new Logger();

        $l->error("test",new FunctionParameter("\$sqlStatement;\$asdfasd", "ttt","asdf"));
    }
}
    function t1()
    {
        $test = new testerClass();
        $test->test(123);
    }


t1();

/*
    // start connection
    $conn = new mysqli("192.168.1.144", "root", "xuan32546");

    // check connection
    if ($conn->connect_error) {
        error_log("Database Connect Error" . $conn->connect_error);
        die("Something went wrong.");
    }
    mysqli_select_db($conn, "pitt_course" );

    $id = "id";
    $field = "1";
    $field1 = "2";
    $stmt = $conn->prepare('SELECT * FROM subject WHERE id = ? or id = ?');
    $stmt->bind_param('s', $field);
    $stmt->bind_param('s', $field1);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        print_r( $row);
    }


    function test()
    {
        print_r( func_get_args());
    }

    test(1,2,3);
*/
?>