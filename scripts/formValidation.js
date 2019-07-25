function originalCheck(id) {
    var originalPriceElement = document.getElementById("" + id).value;
    if (isNaN(originalPriceElement) || originalPriceElement < 1) {
        document.getElementById("alertOriginal").innerHTML = "* ข้อมูลที่จำเป็น (Required Field)";
        document.getElementById("alertInstallYears").innerHTML = "* ข้อมูลที่จำเป็น (Required Field)";
        document.getElementById("alertInstallInterest").innerHTML = "* ข้อมูลที่จำเป็น (Required Field)";
        document.getElementById("salesPersonAlert").innerHTML = "* ข้อมูลที่จำเป็น (Required Field)";
        document.getElementById("salesPhoneAlert").innerHTML = "* ข้อมูลที่จำเป็น (Required Field)";
        document.getElementById("salesLineAlert").innerHTML = "* ข้อมูลที่จำเป็น (Required Field)";
        
    } else {
        document.getElementById("alertOriginal").innerHTML = "";
        document.getElementById("alertInstallYears").innerHTML = "";
        document.getElementById("alertInstallInterest").innerHTML = "";
        document.getElementById("salesPersonAlert").innerHTML = "";
        document.getElementById("salesPhoneAlert").innerHTML = "";
        document.getElementById("salesLineAlert").innerHTML = "";
    } 
}

