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

    var totalPrice = originalPrice + addOn;
    
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
function calcInstallments(digit) {
    var theForm2 = document.getElementById("interestCards" + digit);
    var outputInstallment = theForm2.elements["installment" + digit];
    var years = parseInt(theForm2.elements["years" + digit].value);
    var interest = parseInt(theForm2.elements["interest" + digit].value);
    var financialValue = calcFinVal();

    var installmentValue = ((financialValue * (interest / 100) * years) + financialValue) / (years * 12);

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

/** New Add-On
 * Adds new item to select menu for user to add custom options for selection
 * 
 * Referenced In:
 * - Add button in Div 3 - Add Ons "custom" form group in index.html
 */
function customAddOn() {
    var selectOptions = document.getElementById("AddOnOptions");
    var optionNameValue = document.getElementById("newAddOnName").value;
    if (optionNameValue != '') {
        var newCustomOption = new Option(optionNameValue, optionNameValue, true, true);
        newCustomOption.setAttribute('onclick', 'selection()');
        selectOptions.options[selectOptions.options.length] = newCustomOption;
    }  
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
function selection() {
    k++;
    handleSelected(k);
}
let trackSelections = new Array(); //array stores all addOn names, ensures no duplicates

function handleSelected(k) {
    // Grabs the menu and the name of the additions
    var menu = document.getElementById("AddOnOptions");
    var itemSelected = menu.options[menu.selectedIndex].text;
    
    // Checks if item has been clicked on before (already in selected list)
    // if it is then does nothing, if item does not yet exist, creates the item and adds it to the array.
    if (!trackSelections.includes(itemSelected)) {
        trackSelections.push(itemSelected);
        
        // Creates form group for each option 
        var selectedItemDiv = document.createElement('div');
        selectedItemDiv.setAttribute('class', 'form-group');
        selectedItemDiv.setAttribute('id', "item" + k);
        var stringId = '\'' + selectedItemDiv.id + '\''; 
        selectedItemDiv.setAttribute('onclick', 'uncheckItem('+ stringId +')'); 
            
        // Creates input element to be placed in form-group
        var selectedItemInput = document.createElement('input');
        selectedItemInput.setAttribute('type', 'checkbox');
        selectedItemInput.checked = true;
        selectedItemInput.setAttribute('class', 'custom-control-input');
        selectedItemDiv.appendChild(selectedItemInput);
        var selectedItemLabel = document.createElement('label');
        selectedItemLabel.setAttribute('class', 'custom-control-label');
        selectedItemLabel.innerHTML = itemSelected;
            
        // Creates label element to be placed in form-group
        selectedItemDiv.appendChild(selectedItemLabel);
        var selectedItems = document.getElementById('selectedItems');
        selectedItems.appendChild(selectedItemDiv);
        selectedItems.setAttribute('style', ''); //displays the initially hidden card
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
    var inputValue = item.childNodes[1].innerHTML;
    var index = trackSelections.indexOf(inputValue);
    trackSelections.splice(index, 1); 
    item.parentNode.removeChild(item);
}




