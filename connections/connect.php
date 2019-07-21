<?php
    
    if(!empty($_POST)) {
        //Connect to Database 
        $conn = mysqli_connect('localhost', 'ayush', 'nandinisehgal', 'car_finances');
            //change to root asap 
        //check connection
        if (!$conn) {
            echo 'Connection error: ' . mysqli_connect_error();
        }

        $sql = "INSERT INTO car_finances (name, cost, price) VALUES ('{$conn->real_escape_string($_POST['newAddOnName'])}','{$conn->real_escape_string($_POST['newAddOnCost'])}', '{$conn->real_escape_string($_POST['newAddOnPrice'])}')";
        $insert = $conn->query($sql);

        if($insert) {
            echo "Success! Row ID: {$conn->insert_id}";
        } else {
            die("Error: {$conn->errono} : {$conn->error}");
        }

        $conn->close();
    }

    
?>