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
        
        //alert(lat + ' ' + lng + ' ' + accuracy);
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
            $('#panel').contents().hide();
            $('#panel').append(data).trigger('create');
            $('#panel').trigger('updatelayout');
        });
    });

    $('#opt_locais').click(function(){
        $.get('ajax_locais_coleta', function(data){
            $('#panel').contents().hide();
            $('#panel').append(data);       
            $('#panel').trigger('updatelayout');
        });
    });

    $('#opt_noticias').click(function(){
        $.get('ajax_noticias', function(data){
            $('#panel').contents().hide();
            $('#panel').append(data);       
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
    
    
    $("#panel").panel("open");

});
