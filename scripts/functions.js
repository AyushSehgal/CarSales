/** Calculate Total Car Price
 * retrieves input values from original price text input field 
 * and addOn input field and adds the results, presents them using
 * outputPrice output field.
 * 
 * Referenced In:
 * - getFinVal() to calculate financial value 
 * - originalPrice input field in index.html
 * - addOn input field in index.html
*/
var originalPrice;
var originalPriceDiscount = 0;
var addOn;
var companyBud;
var campaignBud;
function getCarPriceTotal() {
    var form = document.getElementById("carform"); 
    var outputPrice = form.elements["totalPrice"];
    originalPrice = parseInt(form.elements["originalPrice"].value);
    originalPriceDiscount = parseInt(form.elements["originalPriceDiscount"].value);
    addOn = parseInt(form.elements["addOn"].value);
    var totalPrice = 0;

    if (Number.isNaN(addOn) || typeof addOn === 'undefined') {
        addOn = 0; 
    }
    if (Number.isNaN(originalPriceDiscount) || typeof originalPriceDiscount === 'undefined') {
        originalPriceDiscount = 0; 
    }
    
    totalPrice = originalPrice - originalPriceDiscount + addOn;
    
    outputPrice.value = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");    
    return totalPrice;
}

function getBudgetTotal() {
    var form2 = document.getElementById("carform"); 
    var outputBudgetPrice = form2.elements["totalBudgetPrice"];
    companyBud = parseInt(form2.elements["companyBud"].value);
    campaignBud = parseInt(form2.elements["campaignBud"].value);
    if (Number.isNaN(companyBud) || typeof companyBud === 'undefined') {
        companyBud = 0;
    }
    if (Number.isNaN(campaignBud) || typeof campaignBud === 'undefined') {
        campaignBud = 0;  
    }
    var budgetTotal = companyBud + campaignBud;

    outputBudgetPrice.value = budgetTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");    
    return budgetTotal;
}
/** Down Payment Radios 
 * Gathers numerical data from radio menu values 
 * recognizes text box input next to the other tab and returns that value
 * for financial value calculations later.
 * 
 * Referenced In: 
 * - function calcDownVal() to calculate DownPayment value
*/
function getDownPayment() {
    var theForm = document.getElementById("carform");
    var downPaymentVal = 0;
    var downPaymentList = theForm.elements["downPayment"]; 


    for (let i = 0; i < downPaymentList.length; i++) {
        if (downPaymentList[i].checked) {
            downPaymentVal = downPaymentList[i].value;
            if (downPaymentVal == "other") {
                downPaymentVal = parseInt(theForm.elements["otherRadio"].value);
                break;
            }
            if (downPaymentVal == "custom") {
                downPaymentVal = parseInt(theForm.elements["customRadio"].value);
                Number.toString(downPaymentVal);
                downPaymentVal = 'c' + downPaymentVal;
                break;
            }
            break;
        }

    }

    return downPaymentVal;
}
/** Calculate DownPayment Value
 * Uses getCarPriceTotal()'s addition and the radio values
 * using getDownPayment(), converts down payment to a percent decimal
 * and combines the result, limiting the answer to 2 decimal places.
 * 
 * Referenced In:
 * - downPayment radio buttons in index.html
 * - calcInstallments() 
 */
var downDiscount = 0;
function calcDownVal() {
    var theForm1 = document.getElementById("carform");
    var outputDownVal = theForm1.elements["downVal"];
    var total = getCarPriceTotal();
    var down = getDownPayment();
    downDiscount = parseInt(theForm1.elements["downDiscount"].value);

    if (isNaN(downDiscount) || typeof downDiscount === 'undefined') {
        downDiscount = 0;
    }
    if (typeof down === 'string' && down[0] == 'c') {
        down = down.slice(1, down.length);
        down = parseInt(down, 10);
        down = down - downDiscount;
        outputDownVal.value = down.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return down;
    } else {
        var downVal = total * (down / 100);
        downVal = downVal - downDiscount;
        outputDownVal.value = downVal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return downVal; 
    }
    
    
    
}
function calcFinanceVal() {
    var formu = document.getElementById("carform");
    var outputFinanceVal = formu.elements["finVal"];
    var total = getCarPriceTotal();
    var downpayment = calcDownVal();

    var finVal = total - downpayment;
    outputFinanceVal.value = finVal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return finVal;
}
/** Calculate Installment Values
 * Parses data from years and interest (convert to decimal) 
 * text fields and presents the result using outputInstallment output field.
 */
var years;
var interest;
var installmentValue;
function calcInstallments(digit) {
    var theForm2 = document.getElementById("interestCards" + digit);
    var outputInstallment = theForm2.elements["installment" + digit];
    years = parseInt(theForm2.elements["years" + digit].value);
    interest = parseFloat(theForm2.elements["interest" + digit].value);
    var financialValue = calcFinanceVal();

    installmentValue = ((financialValue * (interest / 100) * years) + financialValue) / (years * 12);

    outputInstallment.value = installmentValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return installmentValue;
}

/** Add Interest Cards
 * For multiple calculations, new divs are added that all handle the same
 * installment calculations as above. 
 */
// Each new div is given a unique id, original div's id = 0
var j = 0;
// Referenced In: - Add Calculation button in index.html
function addInterest() {
    j++; //id will be incremented each time a new div object is created.
    add(j);
} 
/** Add Card Helper Function 
 * Referenced In:
 * - addInterest()
 * uses cloneNode() to create a duplicate of the main card with id = 0 
 * updates the id of all the objects for unique and separate calculations
 */ 
function add(identification) {
    // Get card div object and create duplicate, reassign unique id 
    var installmentCard = document.getElementById("card0");
    var duplicate = installmentCard.cloneNode(true);
    duplicate.id = "card" + identification;
    var idString = '\'' + duplicate.id + '\''; //converts id to string for use in adding delete button (line 125-126)
    
    // Updates id and name of form object in card div
    var formDuplicated = duplicate.childNodes[1].childNodes[1];
    formDuplicated.id = "interestCards" + identification;

    // Updates id and name of years form-group 
    var yearsId = duplicate.childNodes[1].childNodes[1].childNodes[1].childNodes[3];
    yearsId.id = "years" + identification;
    yearsId.setAttribute('name', 'years' + identification);

    // Updates id and name of interest form-group 
    var interestId = duplicate.childNodes[1].childNodes[1].childNodes[3].childNodes[3];
    interestId.id = "interest" + identification;
    interestId.setAttribute('name', 'interest' + identification);
    
    // Updates id and name of output field and ensures the previous card's output value does not get duplicated through.
    var outputField = duplicate.childNodes[1].childNodes[1].childNodes[5].childNodes[3];
    outputField.id = "installment" + identification;
    outputField.setAttribute('name', 'installment' + identification);
    outputField.setAttribute('for', 'years' + identification + ' interest' + identification);
    outputField.innerHTML = '';

    //Updates id and name of calculate button 
    var calcButton = duplicate.childNodes[1].childNodes[1].childNodes[7].childNodes[1];
    calcButton.id = "calculate" + identification;
    calcButton.setAttribute('name', 'calculate' + identification);

    // Add delete button to non-primary buttons
    duplicate.innerHTML += '<div class=\"card-footer\"><button type=\"button\" class=\"btn btn-danger\" id=\"deleteButton\" onclick=\"deleteInterest('
        + idString + ')\">ลบ (Delete)</button></div>';

    // Add duplicated card to Div 2 in index.html
    installmentCard.parentNode.appendChild(duplicate);      
}

/** Remove Interest Card
 * Deletes a duplicate, function only allowed in non-primary interest cards.
 * 
 * Referenced In:
 * - add(identification) helper function when delete button added to duplicate cards (line 132-133)
 */
function deleteInterest(divId) {
    j--;
    var card = document.getElementById(divId);
    card.parentNode.removeChild(card);
}

/** Handle Checkbox Selections
 * Created a counter id like the interest cards above so each added item has a unique id.
 * Array created to ensure duplicates are not allowed when selecting items since add-ons can only be added once.
 * Every selected item enters a selected items menu that is hidden at first in the UI.
 * 
 * Referenced In:
 * - each checkbox value <option> in index.html 
 */
var k = 0;
let trackSelections = new Array();
let trackSelectionsMenu = new Array(); 
var totalSelectionsCost = new Array();
var totalSelectionsPrice = new Array();
function selection() {
    var menu = document.getElementById("optionsTable");
    var cells = menu.getElementsByTagName('td');
    for (let l = 0; l < cells.length; l++) {
        var cell = cells[l];   
        cell.onclick = function () {
            var rowId = this.parentNode.rowIndex;
            var rowSelected = menu.getElementsByTagName('tr')[rowId]; 
            
            if (!trackSelections.includes(rowSelected)) {
                trackSelections.push(rowSelected);
                k++;
                var theCost = rowSelected.getElementsByTagName('td')[1].innerHTML;
                var thePrice = rowSelected.getElementsByTagName('td')[2].innerHTML;
                totalSelectionsCost.push(theCost);
                totalSelectionsPrice.push(thePrice);
                selectionsTotal();
                handleSelected(rowSelected, k);
            } else {
                alert('เพิ่มรายการนี้แล้ว (Already Added this Add-On)');
            }  
        }
    }
}

var selectedBody;
function handleSelected(row, k) {
    if (!trackSelectionsMenu.includes(row)) {
        trackSelectionsMenu.push(row);

        // Creates input checkbox element to be placed in table
        var selectedItemInput = document.createElement('button');
        selectedItemInput.setAttribute('type', 'button');
        selectedItemInput.setAttribute('class', 'btn btn-danger btn-sm');
        selectedItemInput.innerHTML = 'ลบ (Remove)';

        selectedBody = document.getElementById('bodySelected');

        //Creates table data for options 
        var duplicateRow = row.cloneNode(true);
        selectedItemInputCell = document.createElement('td');
        selectedItemInputCell.appendChild(selectedItemInput);
        duplicateRow.setAttribute('id', 'item' + k);
        duplicateRow.appendChild(selectedItemInputCell);
        selectedBody.appendChild(duplicateRow);
        var stringId = '\'' + duplicateRow.id + '\'';
        selectedItemInput.setAttribute('onclick', 'uncheckItem('+ stringId +')');
        var selectedItems = document.getElementById('selectedItems');
        selectedItems.setAttribute('style', '');
    } 
}
var totalerCost = 0;
var totalerPrice = 0;
function selectionsTotal() {    
    var intCost;
    var intPrice;
    var outputTotalerCost = document.getElementById('totalsoutputCost');
    var outputTotalerPrice = document.getElementById('totalsoutputPrice');
    let length = totalSelectionsCost.length;
    for (let c = 0; c < length; c++) {
        intCost = parseInt(totalSelectionsCost[c], 10);
        totalSelectionsCost.splice(c, 1);
        intPrice = parseInt(totalSelectionsPrice[c], 10);
        totalSelectionsPrice.splice(c, 1);
        totalerCost += intCost;
        totalerPrice += intPrice;
    }
    outputTotalerCost.innerHTML = totalerCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    outputTotalerPrice.innerHTML = totalerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
}

/** Unchecks Selected Item 
 * Removes selected item from the selected items menu and deletes it from the array so it can be rechecked if needed.
 * 
 * Referenced In:
 * - When onclick value of newly created form-group for input options is changed (line 195)
*/
function uncheckItem(id) {
    var outputTotalerCost = document.getElementById('totalsoutputCost');
    var outputTotalerPrice = document.getElementById('totalsoutputPrice');
    
    var item = document.getElementById(id);
    var inputValue = item.childNodes[1];
    var costValue = item.getElementsByTagName('td')[1].innerHTML;
    var priceValue = item.getElementsByTagName('td')[2].innerHTML;
    totalerCost -= costValue;
    totalerPrice -= priceValue;
    outputTotalerCost.innerHTML = totalerCost;
    outputTotalerPrice.innerHTML = totalerPrice;
    var index = trackSelections.indexOf(inputValue);
    trackSelections.splice(index, 1); 
    trackSelectionsMenu.splice(index, 1);
    item.parentNode.removeChild(item);
}

let newAddedNames = new Array();
function saveAddOn() {
    var myTable = document.getElementById('selectedTable');
    var body = myTable.childNodes[3];
    var customName = document.getElementById('newAddOnName').value;
    var customCost = document.getElementById('newAddOnCost').value;
    var customPrice = document.getElementById('newAddOnPrice').value;
    if (!(customName == "" || customCost == "" || customPrice == "")) {
        var newAddOnRow = document.createElement('tr');
        newAddOnRow.setAttribute('id', customName);
        var AddOnName = document.createElement('td');
        AddOnName.innerHTML = customName;
        var AddOnCost = document.createElement('td');
        AddOnCost.innerHTML = customCost;
        var AddOnPrice = document.createElement('td');
        AddOnPrice.innerHTML = customPrice;
        var AddedButton = document.createElement('button');
        AddedButton.setAttribute('type', 'button');
        AddedButton.setAttribute('class', 'btn btn-danger btn-sm');
        AddedButton.innerHTML = 'Remove';  
        newAddOnRow.appendChild(AddOnName);
        newAddOnRow.appendChild(AddOnCost);
        newAddOnRow.appendChild(AddOnPrice);
        newAddOnRow.appendChild(AddedButton);
        var stringId = '\'' + newAddOnRow.id + '\''; 
        newAddOnRow.setAttribute('onclick', 'uncheckItem('+ stringId +')');
        if (!trackSelectionsMenu.includes(customName)) {
            trackSelectionsMenu.push(customName);
            body.appendChild(newAddOnRow);
            var selectedItems = document.getElementById('selectedItems');
            selectedItems.setAttribute('style', '');
        } else {
            alert('เพิ่มรายการนี้แล้ว (Already Added this Add-On)');
        }
    } else {
        alert('กรุณากรอกในช่อง (Fields cannot be empty)');
    }
    
}

function getVehicleName() {
    var vehicleName = document.getElementById('vehicleName').value;
    return vehicleName;
}

function salesInfo() {
    var salesPerson = document.getElementById('salesPerson').value;
    var salesPhone = document.getElementById('salesPhone').value;
    var salesLine = document.getElementById('salesLine').value;
    var salesInfo = new Array();
    salesInfo.push(salesPerson, salesPhone, salesLine);
    return salesInfo;
}

function populateInterestTable() {
    var cardss;
    var cardsYears;
    var cardsInterest;
    var cardsInstallment;
    var body = [];
    body.push([{text: 'เดือน (Months)', style: 'tableHeader'}, {text: 'ค่างวด (Installment Value) - THB', style: 'tableHeader'}, {text: 'ดอกเบี้ย (Interest) - %', style: 'tableHeader'}]);
    for (let cardNo = 0; cardNo <= j; cardNo++) {
        cardss = document.getElementById('card' + cardNo);
        cardsYears = cardss.childNodes[1].childNodes[1].childNodes[1].childNodes[3].value;
        cardsInterest = cardss.childNodes[1].childNodes[1].childNodes[3].childNodes[3].value;
        cardsInstallment = cardss.childNodes[1].childNodes[1].childNodes[5].childNodes[3].value;
        var subBody = [];
        subBody.push(cardsYears * 12);
        subBody.push(cardsInstallment);
        subBody.push(cardsInterest);
        body.push(subBody);
    }
    return body;
}
function populateAddOnTable(identifier) {
    var tableBody = [];
    var rowAdded;
    var rowName;
    var rowCost;
    var rowPrice;
    var iterator = trackSelections.values();
    if (identifier == 's') {
        tableBody.push([{text: 'ของแถม (Item)', style: 'tableHeader'}, {text: 'มูลค่า (Cost) - THB', style: 'tableHeader'}, {text: 'ราคา (Price) - THB', style: 'tableHeader'}]);
        for (let l = 0; l < trackSelections.length; l++) {
            rowAdded = iterator.next().value;   
            rowName = rowAdded.getElementsByTagName('td')[0].innerHTML;
            rowCost = rowAdded.getElementsByTagName('td')[1].innerHTML;
            rowPrice = rowAdded.getElementsByTagName('td')[2].innerHTML;
            var subTableBody = [];
            subTableBody.push(rowName);
            subTableBody.push(rowCost);
            subTableBody.push(rowPrice);
            tableBody.push(subTableBody);
        }
    } else if (identifier == 'c') {
        tableBody.push([{text: 'ของแถม (Item)', style: 'tableHeader'}]);
        for (let l = 0; l < trackSelections.length; l++) {
            rowAdded = iterator.next().value;
            rowName = rowAdded.getElementsByTagName('td')[0].innerHTML;
            var subTableBody = [];
            subTableBody.push(rowName);
            tableBody.push(subTableBody);
        }
    }
    
    return tableBody;
    
}
function validate(carOriginal, carDownPayment, sales) {
    var x = true;
    if (Number.isNaN(carOriginal)) {
        x = false;
        alert('กรุณาใส่ราคาจริงที่ถูกต้อง (Please enter a valid number for the Original Vehicle Price)');
    }
    if (Number.isNaN(carDownPayment)) {
        x = false;
        alert('กรุณาใส่เงินดาวนเปอร์เซ็นต์ที่ถูกต้อง (Please enter a valid number for the \'other\' down payment)');
    } 
    if (!sales[0]) {
        x = false;
        alert('กรุณาใส่ชื่อที่ถูกต้องสำหรับผู้จัดการฝ่ายขาย (Please enter a valid name for the Sales Person)');
    }
    if (!sales[1]) {
        x = false;
        alert('กรุณาใส่เบอร์โทรศัพท์ของผู้จัดการฝ่ายขายที่ถูกต้อง (Please enter a valid Sales Phone Number)');
    }
    if (!sales[2]) {
        x = false;
        alert('กรุณาใส่ LineID/Emailที่ถูกต้อง (Please enter a valid number LineID/Email)');
    }
    return x;

}
var a = 0;
function genPDF() {
    a++;
    var carName = getVehicleName();
    var carTotal = getCarPriceTotal();
    var carDownPercentage = getDownPayment();
    var placeholderDownVal = 0;
    if (typeof carDownPercentage === 'string' && carDownPercentage[0] == 'c') {
        carDownPercentage = carDownPercentage.slice(1, carDownPercentage.length);
        placeholderDownVal = parseInt(carDownPercentage, 10);
        carDownPercentage = Math.round((placeholderDownVal / carTotal) * 100);
    } 
    var carDownValue = calcDownVal().toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log(carDownValue);
    var carFinance = calcFinanceVal().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var carSalesInfo = salesInfo();

    var remainingValue = getBudgetTotal() - totalerCost;

    
    var valid = validate(originalPrice, carDownPercentage, carSalesInfo);
    if (valid) {
    //Support for commas
    var carTotalP = carTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var originalPriceP = originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var addOnP;
    if (addOn == 0 ||isNaN(addOn) || typeof addOn === 'undefined') {
        addOnP = '-';
    } else {
        addOnP = addOn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    var companyBudP;
    if (companyBud == 0 || isNaN(companyBud) || typeof companyBud === 'undefined') {
        companyBudP = '-';
    } else {
        companyBudP = companyBud.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    var campaignBudP
    if (campaignBud == 0 ||isNaN(campaignBud) || typeof campaignBud === 'undefined') {
        campaignBudP = '-';
    } else {
        campaignBudP = campaignBud.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    if (trackSelections.length == 0) {
        var docDefinitionSales = {
            info: {
                title: 'salesQuotation-' + a + '.pdf',
                author: carSalesInfo[0]
            },
            content: [
                {
                    text: "Sales Quotation",
                    style: 'header'
                },
                ' ',
                'รถยนต์รุ่น (Vehicle Model Name): ' + carName,
                'ราคาจริง (Original Price of Vehicle): ' + originalPriceP + ' THB',
                'บวกหัว (Add-On Price): ' + addOnP + ' THB', 
                'งบบริษัท (Company Budget): ' + companyBudP + ' THB',
                'งบแคมเปญ (Campaign Budget): ' + campaignBudP + ' THB',
                'ของแถมราคาศูนย์ (Add-Ons Company Value): ' + totalerCost + ' THB',
                'ของแถมราคาลูกค้า (Add-Ons Customer Value): ' + totalerPrice + ' THB',
                'งบ - ของแถม (Remaining Value): ' + remainingValue + ' THB',
    
                'ราคารดสุทธิ (Total Price): ' + carTotalP + ' THB',
                ' ',
                'เงินดาวนเปอร์เซ็นต์ (Down Payment Percentage): ' + carDownPercentage + '%',
                'เงินดาวน (Down Payment Value): ' + carDownValue + ' THB',
                'ส่วนลดเงินดาวน (Discount on Vehicle Price): ' + downDiscount + ' THB',
                ' ',
                'ยอดจัดไฟแนนซ์ (Financial Value of Vehicle): ' + carFinance + ' THB',
                ' ',
                'ค่างวด (Installment Values)',
                {
                    style: 'tableForm',
                   table: { 
                       widths: ['33%', '33%', '33%'],  
                       headerRows: 1,
                       body: populateInterestTable()
                   } 
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                },
                subheader: {
                    fontSize: 14,
                    bold: true
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                },
                tableForm: {
                    margin: [0, 5, 0, 15]
                } 
            },
            defaultStyle: {
                font: 'Sarabun',
                fontSize: 12
            }
        };
    
        var docDefinitionCustomer = {
            info: {
                title: 'customerQuotation-' + a + '.pdf',
                author: carSalesInfo[0]
            },
            content: [
                {
                    text: "Customer Quotation",
                    style: 'header'
                },
                ' ',
                'ผู้จัดการฝ่ายขาย (Sales Person): ' + carSalesInfo[0],
                'เบอร์โทรศัพท์ (Sales Phone Number): ' + carSalesInfo[1],
                'LineID/Email: ' + carSalesInfo[2],
    
                'รถยนต์รุ่น (Vehicle Model Name): ' + carName,
                'ราคาจริง (Original Price of Vehicle): ' + originalPriceP + ' THB',
                'ส่วนลดราคาจริง (Discount on Vehicle Price): ' + originalPriceDiscount + 'THB',
                'บวกหัว (Add-On Price): ' + addOnP + ' THB', 
                'ราคารดสุทธิ (Total Price): ' + carTotalP + ' THB',
                ' ',
                'เงินดาวนเปอร์เซ็นต์ (Down Payment Percentage): ' + carDownPercentage + '%',
                'เงินดาวน (Down Payment Value): ' + carDownValue + ' THB',
                'ส่วนลดเงินดาวน (Discount on Vehicle Price): ' + downDiscount + ' THB',
                ' ',
                'ยอดจัดไฟแนนซ์ (Financial Value of Vehicle): ' + carFinance + ' THB',
                ' ',
                'ค่างวด (Installment Values)',
                {
                    style: 'tableForm',
                   table: { 
                       widths: ['33%', '33%', '33%'],  
                       headerRows: 1,
                       body: populateInterestTable()
                   } 
                }     
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                },
                subheader: {
                    fontSize: 14,
                    bold: true
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                },
                tableForm: {
                    margin: [0, 5, 0, 15]
                } 
            },
            defaultStyle: {
                font: 'Sarabun',
                fontSize: 12
            }
        };
    } else {
    var docDefinitionSales = {
        info: {
            title: 'salesQuotation-' + a + '.pdf',
            author: carSalesInfo[0]
        },
        content: [
            {
                text: "Sales Quotation",
                style: 'header'
            },
            ' ',
            'รถยนต์รุ่น (Vehicle Model Name): ' + carName,
            'ราคาจริง (Original Price of Vehicle): ' + originalPriceP + ' THB',
            'ส่วนลดราคาจริง (Discount on Vehicle Price): ' + originalPriceDiscount + 'THB',
            'บวกหัว (Add-On Price): ' + addOnP + ' THB', 
            'งบบริษัท (Company Budget): ' + companyBudP + ' THB',
            'งบแคมเปญ (Campaign Budget): ' + campaignBudP + ' THB',
            'ของแถมราคาศูนย์ (Add-Ons Company Value): ' + totalerCost + ' THB',
            'ของแถมราคาลูกค้า (Add-Ons Customer Value): ' + totalerPrice + ' THB',
            'งบ - ของแถม (Remaining Value): ' + remainingValue + ' THB',
    
            'ราคารดสุทธิ (Total Price): ' + carTotalP + ' THB',
            ' ',
            'เงินดาวนเปอร์เซ็นต์ (Down Payment Percentage): ' + carDownPercentage + '%',
            'เงินดาวน (Down Payment Value): ' + carDownValue + ' THB',
            'ส่วนลดเงินดาวน (Discount on Vehicle Price): ' + downDiscount + ' THB',
             ' ',
            'ยอดจัดไฟแนนซ์ (Financial Value of Vehicle): ' + carFinance + ' THB',                
            ' ',
            'ค่างวด (Installment Values)',
            {
                style: 'tableForm',
               table: { 
                   widths: ['33%', '33%', '33%'],  
                   headerRows: 1,
                   body: populateInterestTable()
               } 
            },
            
            'Add-Ons',
            {
                style: 'tableForm',
                table: {
                    widths: ['33%', '33%', '33%'],
                    headerRows: 1,
                    body: populateAddOnTable('s')
                }
            }     
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center'
            },
            subheader: {
                fontSize: 14,
                bold: true
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            tableForm: {
                margin: [0, 5, 0, 15]
            } 
        },
        defaultStyle: {
            font: 'Sarabun',
            fontSize: 12
        }
    };

    var docDefinitionCustomer = {
        info: {
            title: 'customerQuotation-' + a + '.pdf',
            author: carSalesInfo[0]
        },
        content: [
            {
                text: "Customer Quotation",
                style: 'header'
            },
            ' ',
            'ผู้จัดการฝ่ายขาย (Sales Person): ' + carSalesInfo[0],
            'เบอร์โทรศัพท์ (Sales Phone Number): ' + carSalesInfo[1],
            'LineID/Email: ' + carSalesInfo[2],

            'รถยนต์รุ่น (Vehicle Model Name): ' + carName,
            'ราคาจริง (Original Price of Vehicle): ' + originalPriceP + ' THB',
            'ส่วนลดราคาจริง (Discount on Vehicle Price): ' + originalPriceDiscount + 'THB',
            'บวกหัว (Add-On Price): ' + addOnP + ' THB', 
    
                'ราคารดสุทธิ (Total Price): ' + carTotalP + ' THB',
                ' ',
                'เงินดาวนเปอร์เซ็นต์ (Down Payment Percentage): ' + carDownPercentage + ' %',
                'เงินดาวน (Down Payment Value): ' + carDownValue + ' THB',
                'ส่วนลดเงินดาวน (Discount on Vehicle Price): ' + downDiscount + ' THB',
                ' ',
                'ยอดจัดไฟแนนซ์ (Financial Value of Vehicle): ' + carFinance + ' THB',
                ' ',
                'ค่างวด (Installment Values)',
            {
                style: 'tableForm',
               table: { 
                   widths: ['33%', '33%', '33%'],  
                   headerRows: 1,
                   body: populateInterestTable()
               } 
            },
            
            'Add-Ons',
            {
                style: 'tableForm',
                table: {
                    widths: ['100%'],
                    headerRows: 1,
                    body: populateAddOnTable('c')
                }
            }     
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center'
            },
            subheader: {
                fontSize: 14,
                bold: true
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            tableForm: {
                margin: [0, 5, 0, 15]
            } 
        },
        defaultStyle: {
            font: 'Sarabun',
            fontSize: 12
        }
    };
    }
    
    pdfMake.fonts = {
        Sarabun: {
            normal: 'Sarabun-Regular.ttf',
            bold: 'Sarabun-Bold.ttf',
            italics: 'Sarabun-RegularItalic.ttf',
            bolditalics: 'Sarabun-SemiBoldItalic.ttf'
        },
        Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-MediumItalic.ttf'
        }
    }

    var documentSales = pdfMake.createPdf(docDefinitionSales);
    documentSales.getDataUrl((dataUrl) => {
        let targetLoc = document.getElementById('PDFs');
        let title = document.createElement('legend');
        title.innerHTML = 'Quotation PDFs';
        let targetLocRow = document.createElement('div');
        targetLocRow.setAttribute('class', 'container'); 
        targetLocRow.setAttribute('id', 'grid');
        let frame = document.createElement('iframe');
        frame.setAttribute('height', '500px');
        frame.setAttribute('width', '100%');
        frame.src = dataUrl;
        targetLocRow.appendChild(frame); 
        targetLoc.appendChild(title);
        targetLoc.appendChild(targetLocRow);
    });

    var documentCustomer = pdfMake.createPdf(docDefinitionCustomer);
    documentCustomer.getDataUrl((dataUrl) => {
        let grid = document.getElementById('grid');
        let frames = document.createElement('iframe');
        frames.setAttribute('height', '500px');
        frames.setAttribute('width', '100%');
        frames.src = dataUrl;
        grid.appendChild(frames);
    });
}

}