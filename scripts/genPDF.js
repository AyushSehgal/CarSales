var a = 0;
var installmentTable = function (amount) {
    var result = [];
    var data = {
        months: '48',
        installment_value: '12758',
        interest: '4.05'

    };
    for (var i = 0; i < amount; i++) {
        result.push(Object.assign({}, data));
    }
    return result;
};

function createHeaders(key) {
    var result = [];
    for (var i = 0; i < key.length; i++) {
        result.push({
            'name': key[i],
            'prompt': key[i],
            'width' : 65,
            'padding': 0
        });
    }
    return result;
}

function genPDF() {
    a++;
    var documentSales = new jsPDF('p','cm','a4');
    var documentCustomer = new jsPDF('p','cm','a4');
    var carTotal = getCarPriceTotal();
    var carDownPercentage = getDownPayment();
    var carDownValue = calcDownVal();
    var carFinance = calcFinanceVal();

    documentSales.text(8, 2, 'Promotional Quotation');
    documentSales.setFontSize(12);
    documentSales.text(2, 4, 'Vehicle Model Name: ' + 'Testing123');
    documentSales.text(2, 5, 'Vehicle Original Price: ' + 'Testing123');
    documentSales.text(2, 6.5, 'Down Payment (percentage): ' + 'Testing123');
    documentSales.text(2, 7.5, 'Down Payment (value): ' + 'Testing123');
    documentSales.text(2, 8.5, 'Financial Value of Vehicle: ' + 'Testing123');

    var headersInstallmentTable = createHeaders(["Months", "Installment Value (THB)", "Interest(%)"]);
    documentSales.table(1, 1, installmentTable(10), headersInstallmentTable, { autoSize: true });
    documentSales.save('salesQuotation-' + a + '.pdf');
    documentCustomer.autoPrint();
    
    documentCustomer.save('customerQuotation-' + a + '.pdf');
}


//Disable Submit Button 

