function getCarPriceTotal() {
    var form = document.getElementById("carform"); 
    var outputPrice = form.elements["totalPrice"];
    var originalPrice = parseInt(form.elements["originalPrice"].value);
    var addOn = parseInt(form.elements["addOn"].value);

    var totalPrice = originalPrice + addOn;
    
    outputPrice.value = totalPrice;
    return totalPrice;
}

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

function calcFinVal() {
    var theForm1 = document.getElementById("carform");
    var outputFinVal = theForm1.elements["finVal"];
    var total = getCarPriceTotal();
    var down = getDownPayment();
    
    var finVal = total * (down / 100);

    outputFinVal.value = finVal.toFixed(2);
    return finVal; 
}

function calcInstallments() {
    var theForm2 = document.getElementById("interestCards");
    var outputInstallment = theForm2.elements["installment"];
    var years = parseInt(theForm2.elements["years"].value);
    var interest = parseInt(theForm2.elements["interest"].value);
    var financialValue = calcFinVal();

    var installmentValue = ((financialValue * (interest / 100) * years) + financialValue) / (years * 12);

    outputInstallment.value = installmentValue;
    return installmentValue;
}
var j = 0;
function addInterest() {
    j++;
    add(j);
} 
function add(identification) {
    console.log("Entered AddInterest");
    var installmentCard = document.getElementById("card0");
    var duplicate = installmentCard.cloneNode(true);
    duplicate.id = "card" + identification;
    var idString = '\'' + duplicate.id + '\'';   
    duplicate.innerHTML += '<div class=\"card-footer\"><button type=\"button\" class=\"btn btn-danger\" id=\"deleteButton\" onclick=\"deleteInterest('
        + idString + ')\">Delete</button></div>';
    console.log(duplicate.innerHTML);
    installmentCard.parentNode.appendChild(duplicate);      
}

function deleteInterest(divId) {
    console.log("Entered DeleteInterest");
    var card = document.getElementById(divId);
    card.parentNode.removeChild(card);
}