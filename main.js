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
    
}
