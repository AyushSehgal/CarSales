var k = 0;

var generateData = function (amount) {
    var result = [];
    var data =
    {
        coin: "100",
        game_group: "GameGroup",
        game_name: "XPTO2",
        game_version: "25",
        machine: "20485861",
        vlt: "0"
    };
    for (var i = 0; i < amount; i += 1) {
        data.id = (i + 1).toString();
        result.push(Object.assign({}, data));
    }
    return result;
};

function createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
        result.push({
        'id' : keys[i],
            'name': keys[i],
            'prompt': keys[i],
            'width': 65,
            'align': 'center',
            'padding': 0
        });
    }
    return result;
}
function genPDF() {
    var headers = createHeaders(["id", "coin", "game_group", "game_name", "game_version", "machine", "vlt"]);

    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' });
    doc.table(1, 1, generateData(100), headers, { autoSize: true });
}


// function genPDF() {
//     k++;
//     var documentSales = new jsPDF('p','cm','a4');
//     var documentCustomer = new jsPDF('p','cm','a4');

//     documentSales.text(8, 2, 'Promotional Quotation');
//     documentSales.setFontSize(12);
//     documentSales.text(2, 4, 'Vehicle Model Name: ' + 'Testing123');
//     documentSales.text(2, 5, 'Vehicle Original Price: ' + 'Testing123');
//     documentSales.text(2, 6.5, 'Down Payment (percentage): ' + 'Testing123');
//     documentSales.text(2, 7.5, 'Down Payment (value): ' + 'Testing123');
//     documentSales.text(2, 8.5, 'Financial Value of Vehicle: ' + 'Testing123');

//     var headersInstallmentTable = createHeaders(["Months", "Installment Value (THB)", "Interest(%)"]);
//     documentSales.table(1, 1, installmentTable(10), headersInstallmentTable, { autoSize: true });
//     documentSales.save('salesQuotation-' + k + '.pdf');
//     documentCustomer.autoPrint();
    
//     documentCustomer.save('customerQuotation-' + k + '.pdf');
// }


//Disable Submit Button 