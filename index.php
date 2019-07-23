<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Car Finances</title>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <script src="scripts/jquery-3.4.1.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <script src="node_modules/jsPDF-1.3.2/dist/jspdf.min.js"></script>
        <script src="node_modules/pdfmake/build/pdfmake.min.js"></script>
        <script src="scripts/jQueryScript.js"></script>
        <script src="scripts/main.js"></script>
        <!-- <script src="scripts/genPDF.js"></script> -->
        
    </head>
    <body>
    <?php 
            $connect = mysqli_connect('localhost', 'ayush', 'nandinisehgal', 'car_finances');
            
            $query = "SELECT item, cost, price FROM addOns";
            if(!mysqli_query($connect, $query)) {
              echo 'Not Inserted';
          } else {
            $result = mysqli_query($connect, $query);
          }
            
          ?>
           <h1>Car Finances</h1>
           <!-- Div 1 - Financial Value -->
           <div class="container">
            <form class="form-horizontal mx-auto" id="carform">
                    <fieldset>
                    
                    <!-- Form Name -->
                    <legend>Calculate Financial Value</legend>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label for="originalPrice">Original Price of Vehicle</label>  
                      <input id="originalPrice" oninput="getCarPriceTotal()" name="originalPrice" type="text" placeholder="" class="form-control input-md">  
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label for="addOn">Add-On Price</label>  
                      <input id="addOn" name="addOn" oninput="getCarPriceTotal()" type="text" placeholder="" class="form-control input-md">
                    </div>
                    
                    <!-- Text output-->
                    <div class="form-group">
                      <label for="totalPrice"><strong>Total Price (THB):</strong></label>  
                      <output id="totalPrice" name="totalPrice" for="addOn originalPrice"></output>
                    </div>
                    
                    <!-- Multiple Radios -->
                    <div class="form-group">
                      <label for="downPayment">Down Payment</label>   
                      <div class=radio>
                        <label for="downPayment-0">
                          <input type="radio" name="downPayment" id="downPayment-0" value="15" onclick="calcDownVal(); calcFinanceVal()">
                          15%
                        </label>

                        <br>

                        <label for="downPayment-1">
                          <input type="radio" name="downPayment" id="downPayment-1" value="20" onclick="calcDownVal(); calcFinanceVal()">
                        20%
                        </label>
                        
                        <br>

                        <label for="downPayment-2">
                          <input type="radio" name="downPayment" id="downPayment-2" value="25" onclick="calcDownVal(); calcFinanceVal()">
                        25%
                        </label>
                        
                        <br>
                        <label for="downPayment-3">
                          <input type="radio" name="downPayment" id="downPayment-3" value="other" onclick="calcDownVal(); calcFinanceVal()">
                          Other:
                        </label>
                        <input id="otherRadio" oninput="calcDownVal(); calcFinanceVal()" name="otherRadio" type="text" placeholder="%">
                      </div> 
                    </div>
                  
                    <!-- Text output-->
                    <div class="form-group">
                      <label for="downVal"><strong>Down Payment Value (THB): </strong></label>                        
                      <output id="downVal" name="downVal" for="originalPrice addOn downPayment"></output>
                    </div>

                    <!-- Text output-->
                    <div class="form-group">
                      <label for="finVal"><strong>Finance Value (THB): </strong></label>                        
                      <output id="finVal" name="finVal" for="originalPrice addOn downPayment"></output>
                    </div>
                    <hr width=100%>
                    
                    </fieldset> 
                    </form>
                  </div>

          <!-- Div 2 - Installment Value  -->
          <div class="container" id="cards">
              <legend>Calculate Installment Value</legend>
              <div class="card">
                  <div class="card-header">
                    <button type="button" class="btn btn-primary" onclick="addInterest()">Add Calculation</button>   
                  </div>
              </div>
             
              <div class="card" id="card0">
                <div class="card-body">
                  <form class="form-horizontal" id="interestCards0">
                  <div class="form-group">
                    <label for="years0">Installment Years</label>  
                    <input id="years0" name="years0" oninput="calcInstallments(this.id[5])" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                      <label for="interest0">Interest (%)</label>  
                      <input id="interest0" name="interest0" oninput="calcInstallments(this.id[8])" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                      <label for="installment0"><strong>Installment Value Per Month (THB): </strong></label>                        
                      <output id="installment0" name="installment0" for="years0 interest0"></output>
                  </div>
                  </form>
                </div>    
              </div> 
              <hr width=100%>
              
          </div>

          
          <!-- Div 3 - Add Ons -->
          <div class="container" id="addOnItems">
              <legend>Add-Ons</legend>
              <form class="form-horizontal" id="addOnsForm" method="POST">
                  <h6>Custom Add-On</h6>
                  <div class="row">
                    <div class="col-4">
                      <input id="newAddOnName" name="newAddOnName" type="text" placeholder="Name" class="form-control">
                    </div>
                    <div class="col-3">
                      <input id="newAddOnCost" name="newAddOnCost" type="text" placeholder="Cost (THB)" class="form-control">
                    </div>
                    <div class="col-3">
                      <input id="newAddOnPrice" name="newAddOnPrice" type="text" placeholder="Price (THB)" class="form-control">
                    </div>
                    <div class="col-2">
                      <button type="button" name="add" id="add" class="btn btn-primary btn-block" onclick="saveAddOn()">Add</button>  <!--onclick="customAddOn()"-->                  
                    </div>
                  </div>
                </form>
                <br>
                <h6>Select Your Options</h6>
                <div class="card">
                <table class="table" id="optionsTable">
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Cost (THB)</th>
                      <th scope="col">Price (THB)</th>
                    </tr>
                  </thead>
                  <tbody id="selectedBody">
                    <?php 
                    foreach($result as $row) {
                      echo '
                      <tr onclick="selection()">
                          <td>'.$row["item"].'</td>
                          <td>'.$row["cost"].'</td>
                          <td>'.$row["price"].'</td>
                      </tr>
                      ';
                    }
                    ?>
                  </tbody> 
                </table>
              </div>
                <br>
                <h6>Selected Items</h6>
                <div id="selectedItems" class="custom-control custom-checkbox card" style="display:none">
                  <table id="selectedTable">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Cost (THB)</th>
                            <th scope="col">Price (THB)</th>
                            <th scope="col"></th>
                        </tr>  
                    </thead>
                    <tbody id="bodySelected">

                    </tbody>
                  </table>
                </div>
              <hr width=100%>
        </div>
        
         <!-- Div 4 - Vehicle Name -->
         <div class="container">
           <legend>Vehicle</legend>
           <div class="form-group">
             <label for="vehicleName">Model Name:</label>
             <input id="vehicleName" name="vehicleName" type="text">
         </div>
         <br>
         
          <input type="submit" class="btn-block btn-success btn-lg" value="Submit" onclick="genPDF()">
          
         <br>
         <br>  
         
        
    </body>
    
</html>