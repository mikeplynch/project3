"use strict";
var yelpData;
var map;
var markers = new Array();

$(document).ready(function () {
    console.log("ready!");
    $("#search").submit(function (e) {
        var action = $("#search").attr("action");

        var term = encodeURIComponent("food");
        var location = encodeURIComponent($("#zip").val());

        var data = "term=" + term + "&location=" + location;

        $.ajax({
            cache: false,
            type: "get",
            url: action,
            data: data,
            dataType: "json",
            success: function (result,status,xhr) {
                yelpData = result;

                getRandomFood(yelpData.businesses);
            },

            error:function (error, status, xhr) {
                var resultText = JSON.stringify(error);
                $("#result").text(resultText);
            }
        });
        e.preventDefault();
        return false;
    });
});

function getRandomFood(data){
    //console.dir(data);
    var index = Math.floor(Math.random() * data.length);
    var info = data[index];

    $('#name').text(info.name);
    $('#phone').text(info.phone);

    var fullAddr;
    for(var i = 1; i < info.location.display_address.length; i++){
        if(info.location.display_address[i]){
            fullAddr += info.location.display_address[i] + " ";
        }
    }
    $('#address').text(fullAddr);
    $('#url').text(info.url);

    var latlong = {lat: info.location.coordinate.latitude, lng: info.location.coordinate.longitude};

    $('#results').show();
    google.maps.event.trigger(map, 'resize');

    clearMarkers();

    var marker = new google.maps.Marker({
        position: latlong,
        map: map,
        title: info.name
    });

    markers.push(marker);
    map.panTo(marker.position);

}

function initMap(){
    var initLatLong = {lat: 43.16, lng: -77.61};

    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 12,
        center: initLatLong
    });
}

function clearMarkers() {
    for(var i = 0; i < markers.length; i++){
        markers[i].setMap(null);
    }
}
