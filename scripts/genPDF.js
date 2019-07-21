function genPDF() {
    var document = new jsPDF();

    document.text(10, 10, 'Hello world!');
    document.save('a4.pdf');
}
