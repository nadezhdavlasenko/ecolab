$(document).ready(function() {
    var riskData = [["","","","","","","","","",""]];

    var riskContainer = document.getElementById('table1');
        console.log("Loaded!");
        var riskHot = new Handsontable(riskContainer, {
            data: riskData,
            colHeaders: ['Забруднююча речовина', 'Середня концентрація', 'ГДК м.р., мг/м3', 'Клас небезпеки', 'Prob', 'Risk негайний', 'Коефіцієнт запасу К3', 'Коефіцієнт запасу b',
                'Risk хронiчний'],

            rowHeaders: true,
            columns: [
                {
                    type: 'dropdown'



                },
                {


                },
                {},
                {

                },
                {},
                {
                    editor: false
                },
                {
                    editor: false
                },
                {
                    editor: false
                },
                {
                    editor: false
                }
            ],
            filters: false,
            dropdownMenu: true,
            minSpareRows: 1
        });


});