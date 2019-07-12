
function getCarPriceTotal() {
    var form = document.getElementById("carform"); 
    var outputPrice = form.elements["totalPrice"];
    var originalPrice = parseInt(form.elements["originalPrice"].value);
    var addOn = parseInt(form.elements["addOn"].value);
    //var totalPrice = getOriginalPrice() + getAddOnPrice();

    outputPrice.value = originalPrice + addOn;
    return outputPrice.value;
}

function calcFinVal() {
    var form = document.getElementById["carform"];
    var downPaymentVal = 0;
    var downPaymentList = form.elements["downPayment"];
    
    for (let i = 0; i < downPaymentList.length; i++) {
        if (downPaymentList[i].checked) {
            downPaymentVal = downPaymentList[i].value;
            break;
        }
    }
    
    var outputFinVal = form.elements["finVal"];
    outputFinVal.value = getCarPriceTotal() * (downPaymentVal / 100);
}
