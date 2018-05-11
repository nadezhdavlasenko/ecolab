$(document).ready(function() {

    var riskData = [["","","","","","","","","",""]];
    var riskContainer = document.getElementById('table1');

    var heatmapData = [];
    var heatmap;
    var infowindow;
    var contentString = '<h1 id="firstHeading" class="firstHeading">Запорiжжя</h1>'+
                        '<table>';
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(47,35),
        map: map,
        title: 'Запорожье'
    });

        console.log("Loaded!");
        var riskHot = new Handsontable(riskContainer, {
            data: riskData,
            colHeaders: ['М','Гдк','Kx', 'h', 'Зс'],
            rowHeaders: true,
            columns: [
                {},
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

                    if (!changes || changes[0][1] > 3) {
                        return;
                    }

                    console.log(changes[0][1]);

                    changedRow = changes[0][0];

                    console.log(changes);

                    var currentRow = changedRow;


                    M = riskHot.getDataAtCell(currentRow, 0);
                    GDK = riskHot.getDataAtCell(currentRow, 1);
                    T = riskHot.getDataAtCell(currentRow, 2);
                    Kx = riskHot.getDataAtCell(currentRow, 3);


                    if (M !== "" && GDK !== "" && T !== "" && Kx !== "" &&
                        M !== null && GDK !== null && T !== null && Kx !== null ) {


                        Ai = 1/GDK;

                        Zs = (M *Kx* 0.17) * Ai * T * 0.1;


                        riskHot.setDataAtCell(currentRow, 4, Zs);



                        var addString =
                            '<tr>' +
                            '<td>' + Zs + '</td>' +
                            '</tr>';
                        contentString = contentString + addString;

                        infowindow = new google.maps.InfoWindow({
                            content: contentString + '</table>'
                        });
                        marker.addListener('click', function () {
                            infowindow.open(map, marker);
                        });

                    }

                }
            }
        });

});

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 47.5, lng: 34.5}
    });







}