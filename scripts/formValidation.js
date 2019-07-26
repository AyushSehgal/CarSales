function validateField(id) {
    var originalPriceElement = document.getElementById("" + id).value;
    if (isNaN(originalPriceElement) || originalPriceElement < 1) {
        document.getElementById("alertOriginal").innerHTML = "* จำเป็น (Required Field)";
        document.getElementById("alertInstallYears").innerHTML = "* จำเป็น (Required Field)";
        document.getElementById("alertInstallInterest").innerHTML = "* จำเป็น (Required Field)";
        document.getElementById("salesPersonAlert").innerHTML = "* จำเป็น (Required Field)";
        document.getElementById("salesPhoneAlert").innerHTML = "* จำเป็น (Required Field)";
        document.getElementById("salesLineAlert").innerHTML = "* จำเป็น (Required Field)";
        
    } else {
        document.getElementById("alertOriginal").innerHTML = "";
        document.getElementById("alertInstallYears").innerHTML = "";
        document.getElementById("alertInstallInterest").innerHTML = "";
        document.getElementById("salesPersonAlert").innerHTML = "";
        document.getElementById("salesPhoneAlert").innerHTML = "";
        document.getElementById("salesLineAlert").innerHTML = "";
    } 
}

function autoCheck(num) {
    var radioField = document.getElementById('downPayment-' + num[num.length - 1]);
    radioField.checked = true;
}
