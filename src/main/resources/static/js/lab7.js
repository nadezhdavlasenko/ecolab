$(document).ready(function() {

    var pollutants;


    $.ajax({
        url: "http://localhost:8080/pollutant",
        type: "GET",
        dataType: "json",
        error: function (response) {
            alert(response.responseText);
        },
        success: function (response) {
            console.log(response[1]['name']);
            pollutants = response;
        }
    });

    var riskData = [["","","","","","","","","",""]];
    var riskContainer = document.getElementById('table1');

    var heatmapData = [];
    var heatmap;
    var infowindow;
    var contentString = '<h1 id="firstHeading" class="firstHeading">Запорiжжя</h1>'+
                        '<table><tr><td>Речовина</td><td>Risk негайний</td><td>Risk хронiчний</td></tr>';
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(47,35),
        map: map,
        title: 'Uluru (Ayers Rock)'
    });


    $.when($.ajax('http://localhost:8080/pollutant')).done(function () {


        console.log("Loaded!");
        var riskHot = new Handsontable(riskContainer, {
            data: riskData,
            colHeaders: ['Объект','Ph', 'Еп. Оценка', 'Природная окраска', 'Окраска', 'Кол-во кишечн. палочек', 'Индекс ентерококов', 'Ин колифагов', 'Prob(водный)',
                'Risk(водный)','Prob( окраски)', 'Risk(окраски)','Risk(рекреационное исп-е)','Risk(питьевая вода)'],

            rowHeaders: true,
            columns: [
                {
                    type: 'dropdown',
                    source: pollutants.map(function(value,index) { return value['name']; })

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
            minSpareRows: 1,
            afterChange: function (changes, source) {
                if (arguments[1] !== "loadData") {

                    if (!changes || changes[0][1] > 0) {
                        return;
                    }

                    console.log(changes[0][1]);

                    changedRow = changes[0][0];

                    console.log(changes);

                    var currentRow = changedRow;


                    var pollutant = riskHot.getDataAtCell(currentRow, 0);

                    if (pollutant !== null){
                        var pollutantId;


                        for (var i = 0; i < pollutants.length; i++) {
                            if (pollutants[i]['name'] == pollutant) pollutantId = pollutants[i]['id'];

                        }

                        console.log("pollutantId:" + pollutantId);

                        $.ajax({
                            url: "http://localhost:8080/lab6/calculate",
                            type: "GET",
                            data: {
                                pollutantId: pollutantId

                            },
                            // dataType: "json",
                            error: function (response) {
                                alert(response.responseText);
                            },
                            success: function (response) {
                                console.log(response);
                                //riskCalculationResultData = response;
                                riskHot.setDataAtCell(currentRow, 3, response['pollutantClass']);
                                riskHot.setDataAtCell(currentRow, 1, response['averageConcentration']);
                                riskHot.setDataAtCell(currentRow, 5, response['riskShort']);
                                riskHot.setDataAtCell(currentRow, 7, response['b']);
                                riskHot.setDataAtCell(currentRow, 8, response['riskLong']);
                                riskHot.setDataAtCell(currentRow, 2, response['mcl']);
                                riskHot.setDataAtCell(currentRow, 4, response['prob']);
                                riskHot.setDataAtCell(currentRow, 6, response['kreserve']);

                                 var addString =
                                     '<tr>'+
                                     '<td>'+response['name']+'</td>'+ '<td>'+response['riskShort']+'</td>'+ '<td>'+response['riskLong']+'</td>'+
                                     '</tr>';
                                 contentString = contentString + addString;

                                 infowindow = new google.maps.InfoWindow({
                                    content: contentString + '</table>'
                                });
                                marker.addListener('click', function() {
                                    infowindow.open(map, marker);
                                });

                            }
                        });
                    }
                }
            }
        });
    });

});

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 48.865427, lng: 34.196123},
    });







}