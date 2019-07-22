<?php
    
    if(!empty($_POST)) {
        //Connect to Database 
        $conn = mysqli_connect('localhost', 'ayush', 'nandinisehgal', 'car_finances');
            //change to root asap 
        //check connection
        if (!$conn) {
            echo 'Connection error: ' . mysqli_connect_error();
        }
        
        $item = $_POST['newAddOnName'];
        $cost = $_POST['newAddOnCost'];
        $price = $_POST['newAddOnPrice'];

        $sql = "INSERT INTO addOns (item, cost, price) VALUES ('$item', '$cost', '$price')";
        
        if(!mysqli_query($conn, $sql)) {
            echo 'Not Inserted';
        } else {
            header("refresh:0.2; url=/carsales/index.html");    
        }

        
    }
    
?>