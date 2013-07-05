$(document).ready(function(){

    var lat = -21.229544;
    var lng = -43.771070;
    var accuracy = 999999;

    geolocation = function(){
        navigator.geolocation.getCurrentPosition(get_location, handle_error);
    }

    get_location = function(position){
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        accuracy = position.coords.accuracy;
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

    // Eventos do menu

    $('#opt_atualizar').click(function(){
        //alert('atualizar');
        //$('#panel').html(cache_main_menu);       
        //$('#panel').trigger('updatelayout');
    });

    $('#opt_infra').click(function(){
        $.get('ajax_infraestrutura', function(data){
            $('#main_list').hide();
            $('#panel').prepend(data).trigger('create');
            $('#panel').trigger('updatelayout');
        });
    });

    $('#opt_locais').click(function(){
        $.get('ajax_locais_coleta', function(data){
            $('#main_list').hide();
            $('#panel').prepend(data).trigger('create');
            $('#panel').trigger('updatelayout');
        });
    });

    $('#opt_noticias').click(function(){
        $.get('ajax_noticias', function(data){
            $('#main_list').hide();
            $('#panel').prepend(data).trigger('create');
            $('#panel').trigger('updatelayout');
        });
    });

    $('#opt_descartes').click(function(){
        alert('descartes');
    });

    $('#opt_coletores').click(function(){
        alert('coletores');
    });





    /* Inicialização das funcionalidades */

    // Inicia a detecção da localização do usuário
    geolocation();
    

    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

    var user = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            //icon: new google.maps.MarkerImage("/static/img/user.png")
    });

    /* Eventos no mapa */

    google.maps.event.addListener(user, 'dragend', function(){
        //user.getPosition().lng()
        map.setCenter(user.getPosition());
    });

    google.maps.event.addListener(map, 'click', function(ev){
        alert(ev.latLng.lat() + ' ' + ev.latLng.lng());
    });


    /* Desenha as coordenadas */
    var coords = [
    new google.maps.LatLng(-21.228004410394462, -43.76750886440277),
    new google.maps.LatLng(-21.228516953153143, -43.76747399568558),
    new google.maps.LatLng(-21.228516953153143, -43.767428398132324),
    new google.maps.LatLng(-21.228631962503105, -43.767428398132324),
    new google.maps.LatLng(-21.228621961693626, -43.76735866069794),
    new google.maps.LatLng(-21.228516953153143, -43.767374753952026), 
    new google.maps.LatLng(-21.22851445294888, -43.76722723245621),
    new google.maps.LatLng(-21.228541955193375, -43.76720577478409),
    new google.maps.LatLng(-21.228524453765658, -43.767001926898956),
    new google.maps.LatLng(-21.22848195028969, -43.76700460910797),
    new google.maps.LatLng(-21.22847194947005, -43.76684635877609),
    new google.maps.LatLng(-21.228364440615962, -43.76685440540314),
    new google.maps.LatLng(-21.228331937923713, -43.7666130065918),
    new google.maps.LatLng(-21.228061915280477, -43.766639828681946),
    new google.maps.LatLng(-21.228071916127934, -43.7668839097023),
    new google.maps.LatLng(-21.227959406554984, -43.766897320747375),
  ];
  var flightPath = new google.maps.Polygon({
    paths: coords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 0.5,
    fillColor: "#FF0000",
    fillOpacity: 0.25
  });

  flightPath.setMap(map);


    $("#panel").panel("open");

});
