function getCarPriceTotal() {
    var form = document.getElementById("carform"); 
    var outputPrice = form.elements["totalPrice"];
    var originalPrice = parseInt(form.elements["originalPrice"].value);
    var addOn = parseInt(form.elements["addOn"].value);
    //var totalPrice = getOriginalPrice() + getAddOnPrice();

    outputPrice.value = originalPrice + addOn;
  
}