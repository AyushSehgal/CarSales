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
        <script src="node_modules/pdfmake/build/pdfmake.min.js"></script>
        <script src="node_modules/pdfmake/build/vfs_fonts.js"></script>
        <script src="scripts/jQueryScript.js"></script>
        <script src="scripts/functions.js"></script>
        
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
           
           <!-- Div 1 - Financial Value -->
           <div class="container">
             <br>
           <h1>ไฟแนนซ์ (Car Finances)</h1>
            <form class="form-horizontal mx-auto" id="carform">
                    <fieldset>
                    
                    <!-- Form Name -->
                    <legend>คำนวณยอดไฟแนนซ์ (Calculate Financial Value)</legend>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label for="originalPrice">ราคาจริง (Original Price of Vehicle)</label>  
                      <input id="originalPrice" oninput="getCarPriceTotal(); calcDownVal(); calcFinanceVal()" name="originalPrice" type="text" placeholder="" class="form-control input-md">  
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label for="addOn">ราคาเพิ่มเติม (Add-On Price)</label>  
                      <input id="addOn" name="addOn" oninput="getCarPriceTotal(); calcDownVal(); calcFinanceVal()" type="text" placeholder="" class="form-control input-md">
                    </div>
                    
                    <!-- Text output-->
                    <div class="form-group">
                      <label for="totalPrice"><strong>ราคารดสุทธิ (Total Price) - THB:</strong></label>  
                      <output id="totalPrice" name="totalPrice" for="addOn originalPrice"></output>
                    </div>
                    
                    <!-- Multiple Radios -->
                    <div class="form-group">
                      <label for="downPayment">เงินดาวน (Down Payment)</label>   
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
                          กำหนดเปอร์เซ็นต์เงินดาวนเอง (Other):
                        </label>
                        <input id="otherRadio" oninput="calcDownVal(); calcFinanceVal()" name="otherRadio" type="text" placeholder="%">

                        <br>
                        <label for="downPayment-4">
                          <input type="radio" name="downPayment" id="downPayment-4" value="custom" onclick="calcDownVal(); calcFinanceVal()">
                          กำหนดเงินดาวนเอง (Enter Custom Down Payment Value):
                        </label>
                        <input id="customRadio" oninput="calcDownVal(); calcFinanceVal()" name="customRadio" type="text" placeholder="THB">
                      </div> 
                    </div>

                    <!-- Text output-->
                    <div class="form-group">
                      <label for="downVal"><strong>เงินดาวน (Down Payment Value) - THB: </strong></label>                        
                      <output id="downVal" name="downVal" for="originalPrice addOn downPayment"></output>
                    </div>

                    <!-- Text output-->
                    <div class="form-group">
                      <label for="finVal"><strong>ยอดจัดไฟแนนซ์ (Finance Value) - THB: </strong></label>                        
                      <output id="finVal" name="finVal" for="originalPrice addOn downPayment"></output>
                    </div>
                    <hr width=100%>
                    
                    </fieldset> 
                    </form>
                  </div>

          <!-- Div 2 - Installment Value  -->
          <div class="container" id="cards">
              <legend>หาค่างวด (Calculate Installment Value)</legend>
              <div class="card">
                  <div class="card-header">
                    <button type="button" class="btn btn-primary" onclick="addInterest()">เพิ่มการคำนวณ (Add Calculation)</button>   
                  </div>
              </div>
             
              <div class="card" id="card0">
                <div class="card-body">
                  <form class="form-horizontal" id="interestCards0">
                  <div class="form-group">
                    <label for="years0">จำนวนปีที่ผ่อน (Installment Years)</label>  
                    <input id="years0" name="years0" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                      <label for="interest0">ดอกเบี้ย (Interest) (%)</label>  
                      <input id="interest0" name="interest0" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                      <label for="installment0"><strong>ค่างวดผ่อน (Installment Value Per Month) - THB: </strong></label>                        
                      <output id="installment0" name="installment0" for="years0 interest0"></output>
                  </div>
                  <div class="form-group">
                      <input type="button" class="btn btn-primary" id="calculate0" onclick="calcInstallments(this.id[9])" value="คำนวณ (Calculate)">
                  </div>
                  </form>
                </div>    
              </div> 
              
              
          </div>

          
          <!-- Div 3 - Add Ons -->
          <div class="container" id="addOnItems">
          <hr width=100%>
              <legend>รายการของแถม (Add-Ons)</legend>
              <form class="form-horizontal" id="addOnsForm" method="POST">
                  <h6>กำหนดของแถม (Custom Add-On)</h6>
                  <div class="row">
                    <div class="col-4">
                      <input id="newAddOnName" name="newAddOnName" type="text" placeholder="ของแถม (Item)" class="form-control">
                    </div>
                    <div class="col-3">
                      <input id="newAddOnCost" name="newAddOnCost" type="text" placeholder="มูลค่า (Cost) - THB" class="form-control">
                    </div>
                    <div class="col-3">
                      <input id="newAddOnPrice" name="newAddOnPrice" type="text" placeholder="ราคา (Price) - THB" class="form-control">
                    </div>
                    <div class="col-2">
                      <input type="submit" name="add" id="add" class="btn btn-block btn-success" value="เพิ่ม (Add) " />
                    </div>
                  </div>
                </form>
                <br>
                <h6>เลือกของแถม (Select Your Options)</h6>
                <div class="card">
                <table class="table" id="optionsTable">
                  <thead>
                    <tr>
                      <th scope="col">ของแถม (Item)</th>
                      <th scope="col">ราคาศูนย์ (Cost) - THB</th>
                      <th scope="col">ราคาลูกค้า (Price) - THB</th>
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
                <h6>เลือกของแถมที่เลือกแลว (Selected Items)</h6>
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
                      <tr>
                        <td></td>
                        <td><label><strong>Total: </strong></label><label id="totalsoutputCost"></label></td>
                        <td><label><strong>Total: </strong></label><label id="totalsoutputPrice"></label></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              <hr width=100%>
        </div>
        
         <!-- Div 4 - Vehicle Name -->
        <div class="container">
           <legend>รถยนต์ (Vehicle)</legend>
           <div class="form-group">
             <label for="vehicleName">รุ่น (Model Name):</label>
             <input id="vehicleName" name="vehicleName" type="text" oninput="getVehicleName()" class="form-control">
            </div>
            <hr width=100%>
        <!-- Div 5 - Sales Information -->
            <legend>ข้อมูลการขาย (Sales Information)</legend>
            <div class="form-group">
             <label for="salesPerson">ผู้จัดการฝ่ายขาย (Sales Person):</label>
             <input id="salesPerson" type="text" oninput="salesInfo()" class="form-control">
            </div>
            <div class="form-group">
             <label for="salesPhone">เบอร์โทรศัพท์ (Sales Phone Number):</label>
             <input id="salesPhone" type="text" oninput="salesInfo()" class="form-control">
            </div>
            <div class="form-group">
             <label for="salesLine">LineID or Email:</label>
             <input id="salesLine" type="text" oninput="salesInfo()" class="form-control">
            </div>
   
         <br>
         
          <input type="submit" onclick="genPDF()" class="btn-block btn-success btn-lg" value="ตกลง (Submit)">
          </div>  

          <div class="container" id="PDFs">
          <br>
          <hr width='100%'>

          </div>
          
         <br>
         <br>
         
        
    </body>
    
</html>