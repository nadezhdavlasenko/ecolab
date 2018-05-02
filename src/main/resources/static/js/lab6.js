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



    $.when($.ajax('http://localhost:8080/pollutant')).done(function () {


        console.log("Loaded!");
        var riskHot = new Handsontable(riskContainer, {
            data: riskData,
            colHeaders: ['Забруднююча речовина', 'Середня концентрація', 'ГДК м.р., мг/м3', 'Клас небезпеки', 'Prob', 'Risk негайний', 'Коефіцієнт запасу К3', 'Коефіцієнт запасу b',
                'Risk хронiчний'],

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

    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(47,35),
        map: map,
        title: 'Uluru (Ayers Rock)'
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });


}