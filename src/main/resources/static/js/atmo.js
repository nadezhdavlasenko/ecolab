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
            colHeaders: ['q','ГДКi','Аi', 'Пi', 'Мі', 'Аф'],
            rowHeaders: true,
            columns: [
                {},
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

                    if (!changes || changes[0][1] > 4) {
                        return;
                    }

                    console.log(changes[0][1]);

                    changedRow = changes[0][0];

                    console.log(changes);

                    var currentRow = changedRow;


                    q = riskHot.getDataAtCell(currentRow, 0);
                    GDKi = riskHot.getDataAtCell(currentRow, 1);
                    Ai = riskHot.getDataAtCell(currentRow, 2);
                    Pi = riskHot.getDataAtCell(currentRow, 3);
                    Mi = riskHot.getDataAtCell(currentRow, 4);


                    Knas = 1.55;
                    Kf = 1.25;

                    if (q !== "" && GDKi !== "" && Ai !== "" && Pi !== "" && Mi !== "" &&
                        q !== null && GDKi !== null && Ai !== null && Pi !== null && Mi !== null) {



                        Kzi = q/GDKi;
                        Kt = Knas *Kf;
                        Ai = 1/GDKi;

                        Af = Mi *Pi *Ai *Kt *Kzi;


                        riskHot.setDataAtCell(currentRow, 5, Af);



                        var addString =
                            '<tr>' +
                            '<td>' + Af + '</td>' +
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