$(document).ready(function() {






    var riskData = [["","","","","","","","","",""]];
    var riskContainer = document.getElementById('table1');

    var heatmapData = [];
    var heatmap;
    var infowindow;
    var contentString = '<h1 id="firstHeading" class="firstHeading">Запорiжжя</h1>'+
                        '<table><tr><td>Х1</td><td>Х2</td><td>Х3</td><td>Х4</td><td>ГІМ</td></tr>';





        console.log("Loaded!");
        var riskHot = new Handsontable(riskContainer, {
            data: riskData,
            colHeaders: ['Х1', 'Х2', 'Х3', 'Х4', 'ГІМ', 'Х1', 'Х2', 'МІ', 'Х1', 'Х2', 'ХЦП', 'Х1', 'Х2', 'Х3', 'Х4', 'X5',
                'ПНД', 'Х1', 'ПЗН1', 'ПЗН2', 'Х1', 'ЕЗзаг', 'Х1', 'Х2', 'ВЗ1','ВЗ2', 'Х1', 'Х2', 'ТТ1','ТТ2', 'Х1', 'Х2', 'Х3', 'Х4', 'ГТ1', 'ГТ2', 'Х1', 'ЦД'],

            rowHeaders: true,
            columns: [
                {},
                {},
                {},
                {},

                {
                    editor: false
                },
                {},{},
                {
                    editor: false
                },
                {},
                {},
                {
                    editor: false
                },
                {},
                {},
                {},
                {},
                {},
                {
                    editor: false
                },
                {},
                {
                    editor: false
                },
                {
                    editor: false
                },
                {},
                {
                    editor: false
                },
                {},
                {},
                {
                    editor: false
                },
                {
                    editor: false
                },
                {},
                {},
                {
                    editor: false
                },
                {
                    editor: false
                },
                {},
                {},
                {},
                {},
                {
                    editor: false
                },
                {
                    editor: false
                },
                {},
                {
                    editor: false
                }
            ],
            filters: false,
            dropdownMenu: true,
            minSpareRows: 1,
            afterChange: function (changes, source) {
                if (arguments[1] !== "loadData") {

                    if (!changes || changes[0][1] === 4 || changes[0][1] === 7 || changes[0][1] === 10 || changes[0][1] === 16
                        || changes[0][1] === 18 || changes[0][1] === 19 || changes[0][1] === 21  || changes[0][1] === 24
                        || changes[0][1] === 25 || changes[0][1] === 26 || changes[0][1] === 29 || changes[0][1] === 34 || changes[0][1] === 35  ) {
                        return;
                    }

                    console.log(changes[0][1]);

                    changedRow = changes[0][0];

                    console.log(changes);

                    var currentRow = changedRow;

                    if (changes[0][1] < 4){
                         X1 = riskHot.getDataAtCell(currentRow, 0);
                         X2 = riskHot.getDataAtCell(currentRow, 1);
                         X3 = riskHot.getDataAtCell(currentRow, 2);
                         X4 = riskHot.getDataAtCell(currentRow, 3);

                        if (X1!== null && X2!== null && X3!== null && X4 !== null &&
                            X1!== "" && X2!== "" && X3!== "" && X4 !== ""){

                            riskHot.setDataAtCell(currentRow, 4, 137.6+0.74*X1 +0.68*X2-1.36*X3+1.04*X4)
                        }
                    }

                    if (changes[0][1] > 4 && changes[0][1] < 7){
                        X1 = riskHot.getDataAtCell(currentRow, 5);
                        X2 = riskHot.getDataAtCell(currentRow, 6);

                        if (X1!== "" && X2!== "" ){
                            riskHot.setDataAtCell(currentRow, 7, 592+1.38* X1-0.79*X2)
                        }
                    }

                    if (changes[0][1] > 7 && changes[0][1] < 10){
                        X1 = riskHot.getDataAtCell(currentRow, 8);
                        X2 = riskHot.getDataAtCell(currentRow, 9);

                        if (X1!== "" && X2!== ""){
                            riskHot.setDataAtCell(currentRow, 10, 708+1.8*X2-0.85*X1)
                        }
                    }

                    if (changes[0][1] > 10 && changes[0][1] < 16){
                        X1 = riskHot.getDataAtCell(currentRow, 11);
                        X2 = riskHot.getDataAtCell(currentRow, 12);
                        X3 = riskHot.getDataAtCell(currentRow, 13);
                        X4 = riskHot.getDataAtCell(currentRow, 14);
                        X5 = riskHot.getDataAtCell(currentRow, 15);


                        if (X1!== null && X2!== null && X3!== null && X4 !== null && X5 !== null &&
                            X1!== "" && X2!== "" && X3!== "" && X4 !== "" && X5 !== ""){

                            riskHot.setDataAtCell(currentRow, 16, 883+1.87*X1+2.4*X2-3.1*X3+0.66*X4+1.35*X5)
                        }
                    }

                    if (changes[0][1] > 16 && changes[0][1] < 18){
                        X1 = riskHot.getDataAtCell(currentRow, 17);

                        if (X1!== ""  ){
                            riskHot.setDataAtCell(currentRow, 18, 3972-7.04*X1);
                            riskHot.setDataAtCell(currentRow, 19, 692-1.17*X1)

                        }
                    }

                    if (changes[0][1] > 19 && changes[0][1] < 21){
                        X1 = riskHot.getDataAtCell(currentRow, 20);

                        if (X1!== "" ){
                            riskHot.setDataAtCell(currentRow, 21, 565+1.13*X1);

                        }
                    }

                    if (changes[0][1] > 21 && changes[0][1] < 24){
                        X1 = riskHot.getDataAtCell(currentRow, 22);
                        X2 = riskHot.getDataAtCell(currentRow, 23);

                        if (X1!== "" && X2!== "" && X1!== null && X2!== null){
                            riskHot.setDataAtCell(currentRow, 24, 239+0.68*X1);
                            riskHot.setDataAtCell(currentRow, 25, 31.4+0.18*X2)

                        }
                    }

                    if (changes[0][1] > 25 && changes[0][1] < 28){
                        X1 = riskHot.getDataAtCell(currentRow, 26);
                        X2 = riskHot.getDataAtCell(currentRow, 27);

                        if (X1!== "" && X2!== "" ){
                            riskHot.setDataAtCell(currentRow, 28, 80.2+0.17*X1);
                            riskHot.setDataAtCell(currentRow, 29, 5.1+0.22*X2)

                        }
                    }

                    if (changes[0][1] > 29 && changes[0][1] < 34){
                        X1 = riskHot.getDataAtCell(currentRow, 30);
                        X2 = riskHot.getDataAtCell(currentRow, 31);
                        X3 = riskHot.getDataAtCell(currentRow, 32);
                        X4 = riskHot.getDataAtCell(currentRow, 33);

                        if (X1!== null && X2!== null && X3!== null && X4 !== null &&
                            X1!== "" && X2!== "" && X3!== "" && X4 !== ""){

                            riskHot.setDataAtCell(currentRow, 34, 176+0.8*X1);
                            riskHot.setDataAtCell(currentRow, 35, 9.82+0.1*X4-0.1*X2+0.12*X3)
                        }
                    }

                    if (changes[0][1] > 35 && changes[0][1] < 37){
                        X1 = riskHot.getDataAtCell(currentRow, 36);

                        if (X1!== "" ){
                            riskHot.setDataAtCell(currentRow, 37, 4604+2.7*X1);

                        }
                    }





                }
            }
        });

});








