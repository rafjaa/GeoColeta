$(document).ready(function(){

    geolocation = function(){
        navigator.geolocation.getCurrentPosition(get_location, handle_error);
    }

    get_location = function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var accuracy = position.coords.accuracy;
        
        alert(lat + ' ' + lng + ' ' + accuracy);
    }
    
    handle_error = function(error){
        var PERMISSION_DENIED = 1;
        var POSITION_UNAVAILABLE = 2;
        var TIMEOUT = 3;
        
        alert('erro');
        
        if (error.code == PERMISSION_DENIED){
            alert('why not?');
        }
    }

    geolocation();
    

    

    var mapOptions = {
        center: new google.maps.LatLng(-21.2320030, -43.7666417),
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
    
    
    $("#panel").panel("open");

});
