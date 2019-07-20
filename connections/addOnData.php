<?php

    function get_data() {
        $conn = mysqli_connect("localhost", "ayush", "nandinisehgal","car_finances");
        $query = "SELECT * FROM addOns";
        $result = mysqli_query($conn, $query);
        $add_ons = array();
        while ($row = mysqli_fetch_array($result)) {
            $add_ons = array(
                'name' => $row["name"],
                'cost' => $row["cost"],
                'price' => $row["price"]
            );
        }
        return json_encode($add_ons);
    }

    // echo '<pre>';
    // print_r(get_data());
    // echo '</pre>';

    $file_name = date('d-m-Y') . '.json';

    if (file_put_contents($file_name, get_data())) {
        echo $file_name . ' file created';
    } else {
        echo 'There is some error';
    }
?>