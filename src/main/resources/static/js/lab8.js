$(document).ready(function() {

   // var pollutants;


    // $.ajax({
    //     url: "http://localhost:8080/pollutant",
    //     type: "GET",
    //     dataType: "json",
    //     error: function (response) {
    //         alert(response.responseText);
    //     },
    //     success: function (response) {
    //         console.log(response[1]['name']);
    //         pollutants = response;
    //     }
    // });

    var riskData = [["","","","","","","","","",""]];
    var riskContainer = document.getElementById('table1');

    var heatmapData = [];
    var heatmap;
    var infowindow;
    var contentString = '<h1 id="firstHeading" class="firstHeading">Запорiжжя</h1>'+
                        '<table><tr><td>LADD</td><td>Risk</td><td>CS</td></tr>';
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(47,35),
        map: map,
        title: 'Запорожье'
    });


   // $.when($.ajax('http://localhost:8080/pollutant')).done(function () {


        console.log("Loaded!");
        var riskHot = new Handsontable(riskContainer, {
            data: riskData,
            colHeaders: ['Oдиниця ризику', 'Концентрація речовини в воді (мг/кг)', 'Вiк', 'Risk'],
            rowHeaders: true,
            columns: [
                {},
                {},
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

                    if (!changes || changes[0][1] > 2) {
                        return;
                    }

                    console.log(changes[0][1]);

                    changedRow = changes[0][0];

                    console.log(changes);

                    var currentRow = changedRow;


                    var UR = riskHot.getDataAtCell(currentRow, 0);
                    var CS = riskHot.getDataAtCell(currentRow, 1);
                    var age = riskHot.getDataAtCell(currentRow, 2);
                    var IR;
                    var BW;
                    if (age > 6){
                         IR = 100;
                         BW = 70;
                    }else {
                         IR = 200;
                         BW = 16;
                    }
                    var FI = 1;
                    var EF = 350;
                    var ED = 70;
                    var AT = ED * 365;
                    var CF = 1/1000000;

                    if (UR !== "" && CS !== "" && age !== "" &&
                        UR !== null && CS !== null && age !== null) {


                        var LADD = CS * IR * CF * FI * EF * ED / BW * AT;

                        var Risk = 1 - Math.exp(Math.log(0.84) * LADD);

                        console.log(LADD);

                        riskHot.setDataAtCell(currentRow, 3, Risk);


                        // if (pollutant !== null){
                        //     var pollutantId;
                        //
                        //
                        //     for (var i = 0; i < pollutants.length; i++) {
                        //         if (pollutants[i]['name'] == pollutant) pollutantId = pollutants[i]['id'];
                        //
                        //     }
                        //
                        //     console.log("pollutantId:" + pollutantId);
                        //
                        //     $.ajax({
                        //         url: "http://localhost:8080/lab6/calculate",
                        //         type: "GET",
                        //         data: {
                        //             pollutantId: pollutantId
                        //
                        //         },
                        //         // dataType: "json",
                        //         error: function (response) {
                        //             alert(response.responseText);
                        //         },
                        //         success: function (response) {
                        //             console.log(response);
                        //             //riskCalculationResultData = response;
                        //             riskHot.setDataAtCell(currentRow, 3, response['pollutantClass']);
                        //             riskHot.setDataAtCell(currentRow, 1, response['averageConcentration']);
                        //             riskHot.setDataAtCell(currentRow, 5, response['riskShort']);
                        //             riskHot.setDataAtCell(currentRow, 7, response['b']);
                        //             riskHot.setDataAtCell(currentRow, 8, response['riskLong']);
                        //             riskHot.setDataAtCell(currentRow, 2, response['mcl']);
                        //             riskHot.setDataAtCell(currentRow, 4, response['prob']);
                        //             riskHot.setDataAtCell(currentRow, 6, response['kreserve']);

                        var addString =
                            '<tr>' +
                            '<td>' + LADD + '</td>' + '<td>' + Risk + '</td>' + '<td>' + CS + '</td>' +
                            '</tr>';
                        contentString = contentString + addString;

                        infowindow = new google.maps.InfoWindow({
                            content: contentString + '</table>'
                        });
                        marker.addListener('click', function () {
                            infowindow.open(map, marker);
                        });

                    }
             //               }
            //            });
           //         }
                }
            }
        });
    //});

});

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 47.5, lng: 34.5}
    });







}