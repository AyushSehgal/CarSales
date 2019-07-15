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
                console.log(downPaymentVal);
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
    console.log(theForm2);
    var outputInstallment = theForm2.elements["installment"];
    var years = parseInt(theForm2.elements["years"].value);
    var interest = parseInt(theForm2.elements["interest"].value);
    var financialValue = calcFinVal();
    console.log(years);
    console.log(interest);
    console.log(financialValue);

    var installmentValue = ((financialValue * (interest / 100) * years) + financialValue) / (years * 12);
    console.log(installmentValue);

    outputInstallment.value = installmentValue;
    return installmentValue;
}

function addInterest() {
   var installmentCard = document.getElementById("cards");
   var duplicate = installmentCard.cloneNode(true);
   duplicate.id = "interestCard2";
   duplicate.onclick = addInterest;
   installmentCard.parentNode.appendChild(duplicate);
}

function deleteInterest() {
    var card = document.getElementById("cards");
    card.parentNode.removeChild(card);
}