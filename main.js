
function getCarPriceTotal() {
    var form = document.getElementById("carform"); 
    var outputPrice = form.elements["totalPrice"];
    var originalPrice = parseInt(form.elements["originalPrice"].value);
    var addOn = parseInt(form.elements["addOn"].value);
    //var totalPrice = getOriginalPrice() + getAddOnPrice();

    outputPrice.value = originalPrice + addOn;
    return outputPrice.value;
}

function getDownPayment() {
    var downPayment = 0;
    var form = document.getElementById["carform"];
    var downPaymentList = form.elements["downPayment"];

    for (let i = 0; i < downPaymentList.length; i++) {
        if (downPaymentList[i].checked) {
            downPayment = downPaymentList[i].value;
            break;
        }
    }
    return downPayment / 100;
}

function calcFinVal() {
    var form = document.getElementById["carform"];
    var carPrice = getCarPriceTotal();
    var down = getDownPayment();
    var finVal = carPrice * down;

    var outputFinVal = form.elements["finVal"];
    outputFinVal.value = finVal;
    
    return finVal;
}
