<?php
    $connect = new PDO("mysql:host=localhost;dbname=car_finances", "ayush", "nandinisehgal");

    $data = array(
        ':item'     => $_POST["newAddOnName"],
        ':cost'     => $_POST["newAddOnCost"],
        ':price'     => $_POST["newAddOnPrice"]
    );

    $query = "INSERT INTO addOns (item, cost, price) VALUES (:item, :cost, :price)";
    $statement = $connect->prepare($query);

    if($statement->execute($data)) {
        $output = array(
            'item' => $_POST['newAddOnName'],
            'cost' => $_POST['newAddOnCost'],
            'price'=> $_POST['newAddOnPrice']
        );

        echo json_encode($output);
    }
   
?>