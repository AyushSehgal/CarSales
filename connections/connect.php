<?php
    // //Connect to Database 
    // $conn = mysqli_connect('localhost', 'ayush', 'nandinisehgal', 'car_finances');

    // //check connection
    // if (!$conn) {
    //     echo 'Connection error: ' . mysqli_connect_error();
    // }

    if(isset($_POST['add'])) {
        echo $_POST['name'];
        echo $_POST['cost'];
        echo $_POST['price'];
    }

?>