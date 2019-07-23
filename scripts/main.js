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
function getCarPriceTotal() {
    var form = document.getElementById("carform"); 
    var outputPrice = form.elements["totalPrice"];
    var originalPrice = parseInt(form.elements["originalPrice"].value);
    var addOn = parseInt(form.elements["addOn"].value);
    var totalPrice = 0;

    if (Number.isNaN(addOn)) {
        addOn = 0;    
    }
    totalPrice = originalPrice + addOn;
    
    outputPrice.value = totalPrice;
    return totalPrice;
}
/** Down Payment Radios 
 * Gathers numerical data from radio menu values 
 * recognizes text box input next to the other tab and returns that value
 * for financial value calculations later.
 * 
 * Referenced In: 
 * - function calcFinVal() to calculate financial value
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
            break;
        }

    }
    return downPaymentVal;
}
/** Calculate Financial Value
 * Uses getCarPriceTotal()'s addition and the radio values
 * using getDownPayment(), converts down payment to a percent decimal
 * and combines the result, limiting the answer to 2 decimal places.
 * 
 * Referenced In:
 * - downPayment radio buttons in index.html
 * - calcInstallments() 
 */
function calcDownVal() {
    var theForm1 = document.getElementById("carform");
    var outputDownVal = theForm1.elements["downVal"];
    var total = getCarPriceTotal();
    var down = getDownPayment();
    
    var downVal = total * (down / 100);

    outputDownVal.value = downVal.toFixed(2);
    return downVal; 
}
function calcFinanceVal() {
    var formu = document.getElementById("carform");
    var outputFinanceVal = formu.elements["finVal"];
    var total = getCarPriceTotal();
    var downpayment = calcDownVal();

    var finVal = total - downpayment;
    outputFinanceVal.value = finVal.toFixed(2);
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
    interest = parseInt(theForm2.elements["interest" + digit].value);
    var financialValue = calcFinanceVal();

    installmentValue = ((financialValue * (interest / 100) * years) + financialValue) / (years * 12);

    outputInstallment.value = installmentValue.toFixed(2);
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
    console.log(j);
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

    // Add delete button to non-primary buttons
    duplicate.innerHTML += '<div class=\"card-footer\"><button type=\"button\" class=\"btn btn-danger\" id=\"deleteButton\" onclick=\"deleteInterest('
        + idString + ')\">Delete</button></div>';

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
let updateDatabase = new Map();
function selection() {
    var menu = document.getElementById("optionsTable");
    var cells = menu.getElementsByTagName('td');
    for (let l = 0; l < cells.length; l++) {
        var cell = cells[l];   
        cell.onclick = function () {
            var rowId = this.parentNode.rowIndex;
            var rowSelected = menu.getElementsByTagName('tr')[rowId]; 
            if (!trackSelections.includes(rowSelected)) {
                // rowSelected.style.backgroundColor = "#dee2e6";
                // rowSelected.className += " selected";
                trackSelections.push(rowSelected);
                console.log(trackSelections);
                console.log(trackSelections.length);
                k++;
                handleSelected(rowSelected, k);
            } else {
                alert('Already Added this Add-On');
            }  //else {
        //         rowSelected.style.backgroundColor = "";
        //         rowSelected.classList.remove('selected');
        //         var ind = trackSelections.indexOf(rowSelected);
        //         trackSelections.splice(ind, 1) ;
        //         console.log(trackSelections);
        //         console.log(trackSelections.length);
        //    }
        }
    }
}


function handleSelected(row, k) {
    if (!trackSelectionsMenu.includes(row)) {
        trackSelectionsMenu.push(row);

        // Creates input checkbox element to be placed in table
        var selectedItemInput = document.createElement('button');
        selectedItemInput.setAttribute('type', 'button');
        selectedItemInput.setAttribute('class', 'btn btn-danger btn-sm');
        selectedItemInput.innerHTML = 'Remove';

        var selectedBody = document.getElementById('bodySelected');
        
        //Creates table data for options 
        var selectedItemLabel = document.createElement('tr');
        var selectedItemLabelName = document.createElement('td');
        selectedItemLabelName.innerHTML = row.childNodes[1].innerHTML;
        var selectedItemLabelCost = document.createElement('td');
        selectedItemLabelCost.innerHTML = row.childNodes[3].innerHTML;
        var selectedItemLabelPrice = document.createElement('td');
        selectedItemLabelPrice.innerHTML = row.childNodes[5].innerHTML;
        selectedItemInputCell = document.createElement('td');
        selectedItemInputCell.appendChild(selectedItemInput);
        selectedItemLabel.appendChild(selectedItemLabelName);
        selectedItemLabel.appendChild(selectedItemLabelCost);
        selectedItemLabel.appendChild(selectedItemLabelPrice);
        selectedItemLabel.appendChild(selectedItemInputCell);
        selectedItemLabel.setAttribute('id', "item" + k);
        selectedBody.appendChild(selectedItemLabel);
        var stringId = '\'' + selectedItemLabel.id + '\''; 
        selectedItemInput.setAttribute('onclick', 'uncheckItem('+ stringId +')');
        var selectedItems = document.getElementById('selectedItems');
        selectedItems.setAttribute('style', '');
    } 
}

/** Unchecks Selected Item 
 * Removes selected item from the selected items menu and deletes it from the array so it can be rechecked if needed.
 * 
 * Referenced In:
 * - When onclick value of newly created form-group for input options is changed (line 195)
*/
function uncheckItem(id) {
    var item = document.getElementById(id);
    var inputValue = item.childNodes[1];
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
        console.log(stringId);
        newAddOnRow.setAttribute('onclick', 'uncheckItem('+ stringId +')');
        if (!trackSelectionsMenu.includes(customName)) {
            trackSelectionsMenu.push(customName);
            body.appendChild(newAddOnRow);
            var selectedItems = document.getElementById('selectedItems');
            selectedItems.setAttribute('style', '');
        } else {
            alert('Already Added this Add-On');
        }
    } else {
        alert('Fields cannot be empty');
    }
    
}

function getVehicleName() {
    console.log("in the vehicle name function!");
    var vehicleName = document.getElementById('vehicleName').value;
    return vehicleName;
}

function populateTable() {
    var cardss;
    var cardsYears;
    var cardsInterest;
    var cardsInstallment;
    var body = [];
    body.push(["Months", "Installment Value (THB)", "Interest (%)"]);
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
var a = 0;
function genPDF() {
    a++;
    var carName = getVehicleName();
    var carTotal = getCarPriceTotal();
    var carDownPercentage = getDownPayment();
    var carDownValue = calcDownVal();
    var carFinance = calcFinanceVal();

    var docDefinition = {
        content: [
            {
                text: "Sales Quotation",
                style: 'header'
            },
            ' ',
            'Vehicle Model Name: ' + carName,

            'Vehicle Total Price: ' + carTotal + 'THB',
            ' ',
            'Down Payment (percentage): ' + carDownPercentage + '%',
            'Down Payment (value): ' + carDownValue + 'THB',
            ' ',
            'Financial Value of Vehicle: ' + carFinance + 'THB',
            ' ',
            'Installment Values',
            {
               table: {
                   headerRows: 1,
                   body: populateTable()
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
            }
        },
        defaultStyle: {
            fontSize: 12,
        }
    };
    var documentSales = pdfMake.createPdf(docDefinition).open();//'salesQuotation-' + a + '.pdf'
    //var documentSalesObject = documentSales.getStream();

    
}


//Disable Submit Button 






