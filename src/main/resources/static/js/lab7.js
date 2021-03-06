$(document).ready(function() {

    var waterobjects;






    $.ajax({
        url: "http://localhost:8080/waterobject",
        type: "GET",
        dataType: "json",
        error: function (response) {
            alert(response.responseText);
        },
        success: function (response) {
            console.log(response[1]['name']);
            waterobjects = response;

        }
    });

    var riskData = [["","","","","","","","","",""]];
    var riskContainer = document.getElementById('table1');

    var heatmapData = [];
    var heatmap;
    var infowindow;
    var contentString = '<table>'+'<tr><td>Risk(рекреационное исп-е)</td><td>Risk(питьевая вода)</td></tr>';



    $.when($.ajax('http://localhost:8080/waterobject')).done(function () {

        var markers = [];
        // var infowindows=[waterobjects.length];
        //
        // for (var i = 0; i < waterobjects.length; i++) {
        //
        //     var marker = new google.maps.Marker({
        //         position: new google.maps.LatLng(waterobjects[i]['lat'], waterobjects[i]['lon']),
        //         map: map,
        //         title: waterobjects[i]['name']
        //     });
        //
        //     // infowindows[i] = new google.maps.InfoWindow({
        //     // });
        //
        //     markers[i] = marker;
        //
        //
        // }

        // markers.forEach(function (item, i) {
        //     item.addListener('click', function() {
        //     infowindows[i].open(map, markers[i]);
        // });
        // });




        console.log("Loaded!");
        var riskHot = new Handsontable(riskContainer, {
            data: riskData,
            colHeaders: ['Объект','Ph', 'Еп. Оценка', 'Природная окраска', 'Окраска', 'Кол-во кишечн. палочек', 'Индекс ентерококов', 'Ин колифагов', 'Prob(водный)',
                'Risk(водный)','Prob( окраски)', 'Risk(окраски)','Risk(рекреационное исп-е)','Risk(питьевая вода)'],

            rowHeaders: true,
            columns: [
                {
                    type: 'dropdown',
                    source: waterobjects.map(function(value,index) { return value['name']; })

                },
                {
                    //data: ["1", "2", "3"]
                    // data: waterobjects.map(function(value,index) { return value['ph']; })
                },
                {},
                {

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
                {
                    editor: false
                },
                {
                    editor: false
                },
                {},
                {}
            ],
            filters: false,
            dropdownMenu: true,
            minSpareRows: 1,
            afterChange: function (changes, source) {
                if (arguments[1] !== "loadData") {

                    if (!changes || changes[0][1] > 7) {
                        return;
                    }

                    console.log(changes[0][1]);

                    changedRow = changes[0][0];

                    console.log(changes);

                    var currentRow = changedRow;


                    var waterobject = riskHot.getDataAtCell(currentRow, 0);
                    var ph = riskHot.getDataAtCell(currentRow, 1);
                    var epid = riskHot.getDataAtCell(currentRow, 2);
                    var naturColor = riskHot.getDataAtCell(currentRow, 3);
                    var color = riskHot.getDataAtCell(currentRow, 4);
                    var x1 = riskHot.getDataAtCell(currentRow, 5);
                    var x2 = riskHot.getDataAtCell(currentRow, 6);
                    var x3 = riskHot.getDataAtCell(currentRow, 7);

                    if (waterobject !== "" && ph !== ""
                        && epid !== "" && naturColor !== ""
                        && color !== "" && x1 !== ""
                        && x2 !== "" && x3 !== "" &&
                        waterobject !== null && ph !== null
                        && epid !== null && naturColor !== null
                        && color !== null && x1 !== null
                        && x2 !== null && x3 !== null){
                        var waterobjectId;
                        var lat;
                        var lon;


                        for (var i = 0; i < waterobjects.length; i++) {
                            if (waterobjects[i]['name'] === waterobject) {
                                waterobjectId = waterobjects[i]['id'];
                                lat = waterobjects[i]['lat'];
                                lon = waterobjects[i]['lon'];
                            }


                        }

                        var object = {id:waterobjectId,name: waterobject, lat:lat , lon:lon, ph:ph, epid:epid, naturColor:naturColor, color:color, x1:x1, x2:x2, x3:x3};

                        console.log("waterobjectId:" + waterobjectId);

                        $.ajax({
                            url: "http://localhost:8080/waterobject/update",
                            type: "POST",
                            data: JSON.stringify(object),
                             dataType: "json",
                            contentType: "application/json; charset=utf-8",

                            error: function (response) {
                                alert(response.responseText);
                            },
                            success: function (response) {


                        $.ajax({
                            url: "http://localhost:8080/lab7/calculate",
                            type: "GET",
                            data: {id: waterobjectId},
                            // dataType: "json",
                            error: function (response) {
                                alert(response.responseText);
                            },
                            success: function (response) {
                                console.log(response);
                                //riskCalculationResultData = response;
                                riskHot.setDataAtCell(currentRow, 8, response['waterProb']);
                                riskHot.setDataAtCell(currentRow, 9, response['waterRisk']);
                                riskHot.setDataAtCell(currentRow, 10, response['colorProb']);
                                riskHot.setDataAtCell(currentRow, 11, response['colorRisk']);
                                riskHot.setDataAtCell(currentRow, 12, response['rekrRisk']);
                                riskHot.setDataAtCell(currentRow, 13, response['drinkRisk']);
                                var startString = '<h1 id="firstHeading" class="firstHeading">'+response['name']+'</h1>';

                                 var addString =

                                     '<tr>'+
                                     '<td>'+response['rekrRisk']+'</td>'+ '<td>'+response['drinkRisk']+'</td>'+
                                     '</tr>';
                                 //contentString = startString + contentString + addString;

                                 infowindow = new google.maps.InfoWindow({
                                    content: startString + contentString + addString + '</table>'
                                });
                                // infowindows[response['id']] = infowindow;

                                var marker = new google.maps.Marker({
                                    position: new google.maps.LatLng(lat,lon),
                                    map: map,
                                    title: response['name']
                                });

                                marker.addListener('click', function() {
                                    infowindow.open(map, marker);
                                });

                                markers.push(marker);




                            }
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
        zoom: 9,
        center: {lat: 47.5, lng: 34.5}
    });







}