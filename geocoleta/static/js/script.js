$(document).ready(function(){

    var lat = -21.228686966943123;
    var lng = -43.767511546611786;
    var accuracy = 999999;
    var heatmap = null;
   

    geolocation = function(){
        navigator.geolocation.getCurrentPosition(get_location, handle_error);
    }

    get_location = function(position){
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        accuracy = position.coords.accuracy;

        // if coordenadas estiverem dentro dos limites do IF
        user.setPosition(new google.maps.LatLng(lat, lng));
        map.setCenter(new google.maps.LatLng(lat, lng));
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

    $('#opt_panorama').click(function(){
        
        $("#panel").panel("close");

        if(heatmap && heatmap.getMap()){
            heatmap.setMap(null);
            $("#txt_panorama").html("Panorama");
            return;
        }
        $("#txt_panorama").html("Ocultar panorama");

        var gradient = [
            'rgba(255, 255, 255, 0)', // Exterior
            '#ff0000',
            '#00ff00',
            '#0000ff',
        ];

        $.get('ajax_panorama', function(data){
            
            var heat_map = [];
            for (var i=0; i < data.length; i++){
                heat_map.push(new google.maps.LatLng(data[i][0], data[i][1]))
            };   

            heatmap = new google.maps.visualization.HeatmapLayer({
                data: heat_map,
                dissipating: true,
                radius: 30,
                //maxIntensity: 10,
                opacity: 0.9,
                gradient: gradient,
                map: map,
            });
        });
    });

    $('#opt_descartes').click(function(){
        alert('descartes');
    });

    $('#opt_coletores').click(function(){
        $.get("ajax_estatisticas_coletor", function(data){
            $('#main_list').hide();
            $('#panel').prepend(data).trigger('create');
            $('#panel').trigger('updatelayout');         
        });
    });



    /* Inicialização das funcionalidades */

    // Inicia a detecção da localização do usuário
    geolocation();

    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

    user = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            //icon: new google.maps.MarkerImage("/static/img/user.png")
    });

    /* Desenha as coordenadas */
    var coords_sede = [
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
        new google.maps.LatLng(-21.228256931683497, -43.76686781644821),
        new google.maps.LatLng(-21.228246930848602, -43.76678466796875),        
        new google.maps.LatLng(-21.228331937923713, -43.76676857471466),
        new google.maps.LatLng(-21.228331937923713, -43.7666130065918),
        new google.maps.LatLng(-21.228061915280477, -43.766639828681946),
        new google.maps.LatLng(-21.228071916127934, -43.7668839097023),
        new google.maps.LatLng(-21.227959406554984, -43.766897320747375),
    ];

    var place_sede = new google.maps.Polygon({
        paths: coords_sede,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.25
    });

    place_sede.setMap(map);

   //Biblioteca
    var coords_biblioteca = [
        new google.maps.LatLng(-21.228526953969734, -43.76678466796875),
        new google.maps.LatLng(-21.228569457432723, -43.766787350177765), 
        new google.maps.LatLng(-21.22867946633889, -43.7667390704155), 
        new google.maps.LatLng(-21.22853445458175, -43.766409158706665),
        new google.maps.LatLng(-21.228416944949828, -43.76647084951401), 
        new google.maps.LatLng(-21.228424445567434, -43.766540586948395),     
   ];
   
    var place_biblioteca = new google.maps.Polygon({
        paths: coords_biblioteca,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
    });
    
    place_biblioteca.setMap(map);
    
    //DAP
    var coords_dap = [
        new google.maps.LatLng(-21.227881899910372, -43.76578688621521),
        new google.maps.LatLng(-21.22799940996853, -43.76571714878082),
        new google.maps.LatLng(-21.22784189646495, -43.76546770334244),
        new google.maps.LatLng(-21.2278018930087, -43.76547574996948),
        new google.maps.LatLng(-21.227799392792335, -43.76547306776047),
        new google.maps.LatLng(-21.227704384538598, -43.76553475856781),
        new google.maps.LatLng(-21.22785689775826, -43.765778839588165),
          
        
    ];
    
    var place_dap = new google.maps.Polygon({
         paths: coords_dap,
         strokeColor: "#FF0000",
         strokeOpacity: 0.8,
         strokeWeight: 0.5,
         fillColor: "#FF0000",
         fillOpacity: 0.5
     });
     
     place_dap.setMap(map);
   
     //Enfermaria
     var coords_enfermaria = [
        new google.maps.LatLng(-21.227711885192434, -43.76549184322357),
        new google.maps.LatLng(-21.22783689603352, -43.76541942358017),
        new google.maps.LatLng(-21.227721886063627, -43.76520484685898),
        new google.maps.LatLng(-21.22766938148233, -43.76522362232208),
        new google.maps.LatLng(-21.22763437841776, -43.765148520469666),
        new google.maps.LatLng(-21.227581873805317, -43.76516729593277),
        new google.maps.LatLng(-21.227616876882365, -43.76525044441223),
        new google.maps.LatLng(-21.227576873365074, -43.76527726650238),
        new google.maps.LatLng(-21.227679382356396, -43.76548647880554),
        new google.maps.LatLng(-21.22770188432058, -43.76548111438751),    
     ];
     var place_enfermaria = new google.maps.Polygon({
        paths: coords_enfermaria,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
     });
     place_enfermaria.setMap(map);
     
     //Química
     var coords_quimica = [
        new google.maps.LatLng(-21.2274293603013, -43.764177560806274),
        new google.maps.LatLng(-21.22745686274811, -43.76384228467941),
        new google.maps.LatLng(-21.227266845738235, -43.76382619142532),
        new google.maps.LatLng(-21.227236843030102, -43.764161467552185),
     ];
     var place_quimica = new google.maps.Polygon({
        paths: coords_quimica,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5   
     });
     place_quimica.setMap(map);
     
     
     //Informática
     var coords_informatica = [
        new google.maps.LatLng(-21.22746186319244, -43.7638396024704),
        new google.maps.LatLng(-21.22750436696233, -43.76337558031082),
        new google.maps.LatLng(-21.2275293691742, -43.76322269439697),
        new google.maps.LatLng(-21.227346852930143, -43.763185143470764),
        new google.maps.LatLng(-21.227316850238267, -43.76334339380264),
        new google.maps.LatLng(-21.227266845738235, -43.76382350921631),
     ];
     var place_informatica = new google.maps.Polygon({
        paths: coords_informatica,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
     });
     place_informatica.setMap(map); 
     
     
     //auditorioII
      var coords_auditorioII = [
        new google.maps.LatLng(-21.227629377979284, -43.76554548740387),
        new google.maps.LatLng(-21.227521868511086, -43.765317499637604),
        new google.maps.LatLng(-21.227446861858965, -43.7653523683548),
        new google.maps.LatLng(-21.227556871602356, -43.76558572053909),
      ];
      var place_auditorioII = new google.maps.Polygon({
        paths: coords_auditorioII,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
        
      });
      place_auditorioII.setMap(map);
      

      //Laboratório de Solos
       var coords_labSolos = [
        new google.maps.LatLng(-21.228011911033043, -43.76661032438278),
        new google.maps.LatLng(-21.227989409116176, -43.766419887542725),
        new google.maps.LatLng(-21.227876899480304, -43.7664332985878),
        new google.maps.LatLng(-21.22789190077003, -43.766623735427856),
       ];
       var place_labSolos = new google.maps.Polygon({
        paths: coords_labSolos,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5     
       });
       place_labSolos.setMap(map);
       
       //Garagem
       var coords_garagem = [
        new google.maps.LatLng(-21.230764619634144, -43.76743108034134),
        new google.maps.LatLng(-21.23078462096185, -43.767313063144684),
        new google.maps.LatLng(-21.23078462096185, -43.76721650362015),
        new google.maps.LatLng(-21.230519603149492, -43.7672084569931),
        new google.maps.LatLng(-21.230504602127013, -43.76734793186188),
        new google.maps.LatLng(-21.230467099564127, -43.76735061407089),
        new google.maps.LatLng(-21.2304595990504, -43.76741498708725),
       ];
       var place_garagem = new google.maps.Polygon({
        paths: coords_garagem,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5      
       });
       place_garagem.setMap(map);
 
      //Refeitório
      var coords_refeitorio = [
        new google.maps.LatLng(-21.228099418454935, -43.7666317820549),
        new google.maps.LatLng(-21.228334438131057, -43.7666130065918),
        new google.maps.LatLng(-21.22834693916719, -43.7666130065918),
        new google.maps.LatLng(-21.228356939995304, -43.76661032438278),
        new google.maps.LatLng(-21.228369441029507, -43.76659959554672),
        new google.maps.LatLng(-21.228371941236226, -43.76659154891968),
        new google.maps.LatLng(-21.228369441029507, -43.7665781378746),
        new google.maps.LatLng(-21.22835944020223, -43.766567409038544),
        new google.maps.LatLng(-21.22834693916719, -43.76656472682953),
        new google.maps.LatLng(-21.228336938338362, -43.766556680202484),
        new google.maps.LatLng(-21.22831943688633, -43.766540586948395),
        new google.maps.LatLng(-21.228309436055657, -43.76652717590332),
        new google.maps.LatLng(-21.22829943522431, -43.766513764858246),
        new google.maps.LatLng(-21.228289434392288, -43.7665057182312),
        new google.maps.LatLng(-21.22827443314297, -43.7664869427681),
        new google.maps.LatLng(-21.228254431474856, -43.76646280288696),
        new google.maps.LatLng(-21.228221928758355, -43.76643866300583),
        new google.maps.LatLng(-21.22819942687352, -43.76642256975174),
        new google.maps.LatLng(-21.228174424775247, -43.76640111207962),
        new google.maps.LatLng(-21.228156923303917, -43.766387701034546),
        new google.maps.LatLng(-21.22813192119842, -43.7663796544075),
        new google.maps.LatLng(-21.22811191951097, -43.766376972198486),
        new google.maps.LatLng(-21.228076916551412, -43.7663796544075),
        new google.maps.LatLng(-21.228061915280477, -43.766382336616516),
        new google.maps.LatLng(-21.22804191358355, -43.76639038324356),
        new google.maps.LatLng(-21.228036913158885, -43.766403794288635),
        new google.maps.LatLng(-21.228036913158885, -43.76641720533371),
        new google.maps.LatLng(-21.228034412946492, -43.7664520740509),
        new google.maps.LatLng(-21.228051914432353, -43.7666317820549),
      ];
      var place_refeitorio = new google.maps.Polygon({
        paths: coords_refeitorio,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5  
      });
      place_refeitorio.setMap(map);
      
      // Campo de Futebol
      var coords_CampoFutebol = [
        new google.maps.LatLng(-21.232904746316247, -43.764628171920776),
        new google.maps.LatLng(-21.233127257705195, -43.764255344867706),
        new google.maps.LatLng(-21.233142258460916, -43.76422584056854),
        new google.maps.LatLng(-21.233154759089505, -43.76421242952347),
        new google.maps.LatLng(-21.233169759842415, -43.764193654060364),
        new google.maps.LatLng(-21.233182260468677, -43.76418024301529),
        new google.maps.LatLng(-21.23320476159328, -43.7641641497612),
        new google.maps.LatLng(-21.23322726271447, -43.764150738716125),
        new google.maps.LatLng(-21.2332497638322, -43.76413732767105),
        new google.maps.LatLng(-21.23327476507011, -43.76412391662598),
        new google.maps.LatLng(-21.233307266673034, -43.76411318778992),
        new google.maps.LatLng(-21.233307266673034, -43.76411318778992),
        new google.maps.LatLng(-21.23335226888067, -43.76410782337189),
        new google.maps.LatLng(-21.233382270344798, -43.76410782337189),
        new google.maps.LatLng(-21.233404771438884, -43.76410245895386),
        new google.maps.LatLng(-21.233444773375464, -43.76410514116287),
        new google.maps.LatLng(-21.233477274940935, -43.76411318778992),
        new google.maps.LatLng(-21.23351477673834, -43.76412659883499),
        new google.maps.LatLng(-21.233542278050376, -43.764145374298096),
        new google.maps.LatLng(-21.23356727923869, -43.764161467552185),
        new google.maps.LatLng(-21.23359228042276, -43.764182925224304),
        new google.maps.LatLng(-21.233612281366966, -43.76420438289642),
        new google.maps.LatLng(-21.233632282308463, -43.76422852277756),
        new google.maps.LatLng(-21.2336472830128, -43.764260709285736),
        new google.maps.LatLng(-21.233659783598593, -43.764287531375885),
        new google.maps.LatLng(-21.233677284416903, -43.76433044672012),
        new google.maps.LatLng(-21.233687284883583, -43.764381408691406),
        new google.maps.LatLng(-21.233689785000138, -43.76441091299057),
        new google.maps.LatLng(-21.233687284883583, -43.76443773508072),
        new google.maps.LatLng(-21.233689785000138, -43.76448601484299),
        new google.maps.LatLng(-21.233689785000138, -43.76448601484299),
        new google.maps.LatLng(-21.233672284183303, -43.76454770565033),
        new google.maps.LatLng(-21.233654783364393, -43.76457720994949),
        new google.maps.LatLng(-21.233637282543413, -43.76461207866669),
        new google.maps.LatLng(-21.233604781013206, -43.76467376947403),
        new google.maps.LatLng(-21.23342977265052, -43.76497149467468),
        new google.maps.LatLng(-21.233182260468677, -43.76538723707199),
        new google.maps.LatLng(-21.233164759591613, -43.765411376953125),
        new google.maps.LatLng(-21.233137258209172, -43.76543551683426),
        new google.maps.LatLng(-21.233112256947948, -43.76545429229736),
        new google.maps.LatLng(-21.233079755302033, -43.76547306776047),
        new google.maps.LatLng(-21.233049753776367, -43.76548647880554),
        new google.maps.LatLng(-21.233022252372464, -43.76549452543259),
        new google.maps.LatLng(-21.232989750706718, -43.76550257205963),
        new google.maps.LatLng(-21.23296224929163, -43.76550257205963),
        new google.maps.LatLng(-21.232922247224177, -43.76550257205963),
        new google.maps.LatLng(-21.232897245926488, -43.76550257205963),
        new google.maps.LatLng(-21.232869744494163, -43.76549452543259),
        new google.maps.LatLng(-21.23283224253272, -43.76548111438751),
        new google.maps.LatLng(-21.232809741351257, -43.76546770334244),
        new google.maps.LatLng(-21.23278474003451, -43.76545697450638),
        new google.maps.LatLng(-21.23276473897808, -43.76544088125229),
        new google.maps.LatLng(-21.2327397376537, -43.76541942358017),
        new google.maps.LatLng(-21.23271723645813, -43.765395283699036),
        new google.maps.LatLng(-21.232699735525877, -43.76537382602692),
        new google.maps.LatLng(-21.232684734725144, -43.76534968614578),
        new google.maps.LatLng(-21.23267473419048, -43.76533091068268),
        new google.maps.LatLng(-21.23266473365514, -43.76530408859253),
        new google.maps.LatLng(-21.232657233253178, -43.76528263092041),
        new google.maps.LatLng(-21.232642232448132, -43.76524776220322),
        new google.maps.LatLng(-21.232642232448132, -43.76522362232208),
        new google.maps.LatLng(-21.232639732313814, -43.76517802476883),
        new google.maps.LatLng(-21.232642232448132, -43.76515656709671),
        new google.maps.LatLng(-21.232649732850845, -43.765132427215576),
        new google.maps.LatLng(-21.232647232716655, -43.76510828733444),
        new google.maps.LatLng(-21.232657233253178, -43.76507341861725),
        new google.maps.LatLng(-21.2326697339229, -43.76504123210907),
        new google.maps.LatLng(-21.232682234591554, -43.76500904560089),
        new google.maps.LatLng(-21.232704735792453, -43.76497954130173),
        new google.maps.LatLng(-21.23272973712276, -43.764933943748474),  
      ];
      var place_CampoFutebol = new google.maps.Polygon({
        paths: coords_CampoFutebol,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
      });
      place_CampoFutebol.setMap(map);
      
      //Pista para Corrida
      var coords_pistaCorrida = [
        new google.maps.LatLng(-21.233437273013184, -43.7651726603508),
        new google.maps.LatLng(-21.2337272867435, -43.76465767621994),
        new google.maps.LatLng(-21.233757288131333, -43.7645959854126),
        new google.maps.LatLng(-21.233772288822944, -43.764550387859344),
        new google.maps.LatLng(-21.233779789168192, -43.76453161239624),
        new google.maps.LatLng(-21.233782289283187, -43.76449406147003),
        new google.maps.LatLng(-21.233787289513057, -43.76446455717087),
        new google.maps.LatLng(-21.233787289513057, -43.76444309949875),
        new google.maps.LatLng(-21.233787289513057, -43.76441091299057),
        new google.maps.LatLng(-21.233782289283187, -43.76437336206436),
        new google.maps.LatLng(-21.23377728905316, -43.76433581113815),
        new google.maps.LatLng(-21.23376478847733, -43.764303624629974),
        new google.maps.LatLng(-21.23374978778495, -43.76425266265869),
        new google.maps.LatLng(-21.2337272867435, -43.76420170068741),
        new google.maps.LatLng(-21.233702285582318, -43.764166831970215),
        new google.maps.LatLng(-21.233674784300128, -43.764129281044006),
        new google.maps.LatLng(-21.233644782895517, -43.76410245895386),
        new google.maps.LatLng(-21.233619781720343, -43.76408100128174),
        new google.maps.LatLng(-21.233579779831253, -43.764051496982574),
        new google.maps.LatLng(-21.233547278288377, -43.764030039310455),
        new google.maps.LatLng(-21.23350727637962, -43.764019310474396),
        new google.maps.LatLng(-21.233464774339673, -43.76400053501129),
        new google.maps.LatLng(-21.233422272287473, -43.76399517059326),
        new google.maps.LatLng(-21.23335476900293, -43.76399248838425),
        new google.maps.LatLng(-21.233307266673034, -43.76400589942932),
        new google.maps.LatLng(-21.23327476507011, -43.76401126384735),
        new google.maps.LatLng(-21.233239763335856, -43.76402735710144),
        new google.maps.LatLng(-21.233189760843935, -43.764040768146515),
        new google.maps.LatLng(-21.233164759591613, -43.76405417919159),
        new google.maps.LatLng(-21.233164759591613, -43.76405417919159),
        new google.maps.LatLng(-21.233127257705195, -43.76408904790878),
        new google.maps.LatLng(-21.23307225492119, -43.76416951417923),
        new google.maps.LatLng(-21.233027252628112, -43.76424193382263),
        new google.maps.LatLng(-21.23284724331844, -43.764550387859344),
        new google.maps.LatLng(-21.23261723110299, -43.764939308166504),
        new google.maps.LatLng(-21.23257722894194, -43.765017092227936),
        new google.maps.LatLng(-21.232557227857342, -43.76508951187134),
        new google.maps.LatLng(-21.232557227857342, -43.765137791633606),
        new google.maps.LatLng(-21.232554727721585, -43.765196800231934),
        new google.maps.LatLng(-21.232554727721585, -43.7652263045311),
        new google.maps.LatLng(-21.23255972799307, -43.76526653766632),
        new google.maps.LatLng(-21.232567228399983, -43.7652987241745),
        new google.maps.LatLng(-21.23258222921266, -43.76533895730972),
        new google.maps.LatLng(-21.232599730158867, -43.76537650823593),
        new google.maps.LatLng(-21.232609730698623, -43.765411376953125),
        new google.maps.LatLng(-21.23263223191058, -43.765443563461304),
        new google.maps.LatLng(-21.23266723378904, -43.76548379659653),
        new google.maps.LatLng(-21.232697235392525, -43.765510618686676),
        new google.maps.LatLng(-21.23272723698992, -43.76553475856781),
        new google.maps.LatLng(-21.232769739242443, -43.765564262866974),
        new google.maps.LatLng(-21.232804741088255, -43.76557767391205),
        new google.maps.LatLng(-21.232829742401606, -43.76558572053909),
        new google.maps.LatLng(-21.2328672443637, -43.76559913158417),
        new google.maps.LatLng(-21.232912246705602, -43.76560181379318),
        new google.maps.LatLng(-21.23295224877578, -43.76560717821121),
        new google.maps.LatLng(-21.2330122518607, -43.76560181379318),
        new google.maps.LatLng(-21.23303725313887, -43.76559644937515),
        new google.maps.LatLng(-21.233079755302033, -43.76558572053909),
        new google.maps.LatLng(-21.233094756062577, -43.76557767391205),
        new google.maps.LatLng(-21.233122257452944, -43.76556694507599),
        new google.maps.LatLng(-21.233147258712478, -43.765553534030914),
        new google.maps.LatLng(-21.233164759591613, -43.765542805194855),
        new google.maps.LatLng(-21.233182260468677, -43.76552939414978),
        new google.maps.LatLng(-21.23319976134368, -43.765515983104706),
        new google.maps.LatLng(-21.23321976234113, -43.76549988985062),
        new google.maps.LatLng(-21.233232262963156, -43.76548379659653),
        new google.maps.LatLng(-21.23324226346001, -43.76547306776047),
        new google.maps.LatLng(-21.233262264451685, -43.76545161008835),
        new google.maps.LatLng(-21.233284765564076, -43.765422105789185),
        new google.maps.LatLng(-21.23335976924729, -43.765301406383514),
        new google.maps.LatLng(-21.233377270101197, -43.765269219875336),
        new google.maps.LatLng(-21.233392270831477, -43.7652450799942),
        new google.maps.LatLng(-21.233399771196048, -43.76522898674011),
        new google.maps.LatLng(-21.23341227180282, -43.76520752906799),
        new google.maps.LatLng(-21.233409771681554, -43.76521557569504),
        new google.maps.LatLng(-21.233417272045234, -43.765196800231934),
        new google.maps.LatLng(-21.23343227277144, -43.76517802476883),       
      ];
      var place_pistaCorrida = new google.maps.Polygon({
        paths: coords_pistaCorrida,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
      });
      place_pistaCorrida.setMap(map);
      
      //Quadra
      var coords_quadra = [
        new google.maps.LatLng(-21.232884745276063, -43.765679597854614),
        new google.maps.LatLng(-21.2324872240399, -43.765443563461304),
        new google.maps.LatLng(-21.232367217418414, -43.7656769156456),
        new google.maps.LatLng(-21.232754738448822, -43.76591295003891),
      ];
      var place_quadra = new google.maps.Polygon({
        paths: coords_quadra,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
      });
      place_quadra.setMap(map);
      
      
      // Quadra Coberta
      var coords_quadraCoberta = [
      new google.maps.LatLng(-21.232569728535534, -43.76624822616577),
      new google.maps.LatLng(-21.232684734725144, -43.76607924699783),
      new google.maps.LatLng(-21.232749738183962, -43.765920996665955),
      new google.maps.LatLng(-21.232377217973934, -43.765690326690674),
      new google.maps.LatLng(-21.232372217696252, -43.76570373773575),
      new google.maps.LatLng(-21.232344716166004, -43.76571446657181),
      new google.maps.LatLng(-21.232189707445045, -43.76601219177246),
      new google.maps.LatLng(-21.232212208721112, -43.76601219177246),
      new google.maps.LatLng(-21.23220720843783, -43.76602292060852),
      
      ];
      var place_quadraCoberta = new google.maps.Polygon({
        paths: coords_quadraCoberta,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
      });
      place_quadraCoberta.setMap(map);

      
      //Piscina
      var coords_piscina = [
        new google.maps.LatLng(-21.23238971866738, -43.76645475625992),
        new google.maps.LatLng(-21.232462222668488, -43.76633942127228),
        new google.maps.LatLng(-21.23250472499738, -43.76624017953873),
        new google.maps.LatLng(-21.232197207870787, -43.76604974269867),
        new google.maps.LatLng(-21.232159705738304, -43.76606047153473),
        new google.maps.LatLng(-21.232059700005074, -43.766256272792816),
        new google.maps.LatLng(-21.23208970173217, -43.76626431941986),

      ];
      var place_piscina = new google.maps.Polygon({
        paths: coords_piscina,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
      });
      place_piscina.setMap(map);
      
      //Ginásio
      var coords_ginasio = [
        new google.maps.LatLng(-21.232194707728926, -43.76684904098511),
        new google.maps.LatLng(-21.232394718944466, -43.76647084951401),
        new google.maps.LatLng(-21.232069700581444, -43.766267001628876),
        new google.maps.LatLng(-21.23205219957235, -43.76630187034607),
        new google.maps.LatLng(-21.23203469856117, -43.76630187034607),
        new google.maps.LatLng(-21.232012197258033, -43.76635015010834),
        new google.maps.LatLng(-21.232032198416547, -43.76637160778046),
        new google.maps.LatLng(-21.231989695951462, -43.76646012067795),
        new google.maps.LatLng(-21.231954693912193, -43.7664520740509),
        new google.maps.LatLng(-21.23193469274317, -43.76650035381317),
        new google.maps.LatLng(-21.231954693912193, -43.76652181148529),
        new google.maps.LatLng(-21.231907191131324, -43.76660764217377),
        new google.maps.LatLng(-21.23187968951436, -43.7666130065918),
        new google.maps.LatLng(-21.23185968833516, -43.76665860414505),
        new google.maps.LatLng(-21.231907191131324, -43.76667469739914),
      ];
      var place_ginasio = new google.maps.Polygon({
        paths: coords_ginasio,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5      
      });
      place_ginasio.setMap(map);
      
      //laticínios
      var coords_laticinio = [
        new google.maps.LatLng(-21.231467164644393, -43.76763492822647),
        new google.maps.LatLng(-21.231367158441522, -43.767538368701935),
        new google.maps.LatLng(-21.231224649485277, -43.767675161361694),
        new google.maps.LatLng(-21.231322155628117, -43.76778244972229),

      ];
      var place_laticinio = new google.maps.Polygon({
        paths: coords_laticinio,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
      });
      place_laticinio.setMap(map);
      
      //Alojamento
      var coords_alojamento = [
        new google.maps.LatLng(-21.22877197376464, -43.768503963947296),
        new google.maps.LatLng(-21.228844479544275, -43.76849591732025),
        new google.maps.LatLng(-21.22888948311371, -43.76849591732025),
        new google.maps.LatLng(-21.22920700790781, -43.76845568418503),
        new google.maps.LatLng(-21.229197007137326, -43.76840740442276),
        new google.maps.LatLng(-21.229169505014973, -43.768404722213745),
        new google.maps.LatLng(-21.229162004435256, -43.76832693815231),
        new google.maps.LatLng(-21.22887698212358, -43.76835644245148),
        new google.maps.LatLng(-21.228759472764562, -43.76836985349655),  
      ];
      var place_alojamento = new google.maps.Polygon({
        paths: coords_alojamento,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
      });
      place_alojamento.setMap(map);
      
      //EAD
      var coords_ead = [
        new google.maps.LatLng(-21.229064496864297, -43.768316209316254),
        new google.maps.LatLng(-21.229387021660692, -43.76828670501709),
        new google.maps.LatLng(-21.229372020522998, -43.7682169675827),
        new google.maps.LatLng(-21.229357019383794, -43.7682169675827),
        new google.maps.LatLng(-21.229352019003723, -43.76821160316467),
        new google.maps.LatLng(-21.229059496474303, -43.76824378967285),        
      ];
      var place_ead = new google.maps.Polygon({
        paths: coords_ead,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
      });
      place_ead.setMap(map);
      
      //FAPE
      var coords_fape = [
        new google.maps.LatLng(-21.22958453649788, -43.768152594566345),
        new google.maps.LatLng(-21.229569535380293, -43.76812309026718),
        new google.maps.LatLng(-21.229587036683995, -43.76810699701309),
        new google.maps.LatLng(-21.229524532018342, -43.768015801906586),
        new google.maps.LatLng(-21.229337017862466, -43.768125772476196),
        new google.maps.LatLng(-21.22941702393147, -43.76825451850891),       
      ];
      var place_fape = new google.maps.Polygon({
        paths: coords_fape,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
      });
      place_fape.setMap(map);
      
      //Oficina
      var coords_oficina = [
        new google.maps.LatLng(-21.228519453357357, -43.768750727176666),
        new google.maps.LatLng(-21.228521953561522, -43.7686488032341),
        new google.maps.LatLng(-21.228324437301413, -43.76863270998001),
        new google.maps.LatLng(-21.22832943771632, -43.76873463392258),
      ];
      var place_oficina = new google.maps.Polygon({
        paths: coords_oficina,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
      });
      place_oficina.setMap(map);
     
     //equinocultura
     var coords_equinocultura = [
        new google.maps.LatLng(-21.239429940845564, -43.76363307237625),
        new google.maps.LatLng(-21.23941244071005, -43.76354455947876),
        new google.maps.LatLng(-21.239197438875856, -43.76360356807709),
        new google.maps.LatLng(-21.239159938523823, -43.76360088586807),
        new google.maps.LatLng(-21.23911993813781, -43.76359283924103),
        new google.maps.LatLng(-21.239059937538435, -43.76358479261398),
        new google.maps.LatLng(-21.239002436941103, -43.76356601715088),
        new google.maps.LatLng(-21.23896993659357, -43.76354992389679),
        new google.maps.LatLng(-21.238794934599063, -43.76348555088043),
        new google.maps.LatLng(-21.23867993317526, -43.76346409320831),
        new google.maps.LatLng(-21.238604932198367, -43.763431906700134),
        new google.maps.LatLng(-21.23852243107972, -43.763399720191956),
        new google.maps.LatLng(-21.2383924292233, -43.76334607601166),
        new google.maps.LatLng(-21.238364928815916, -43.7633353471756),
        new google.maps.LatLng(-21.23833492836562, -43.76332998275757),
        new google.maps.LatLng(-21.23830992798573, -43.76333266496658),
        new google.maps.LatLng(-21.23828742764019, -43.7633353471756),
        new google.maps.LatLng(-21.23826242725224, -43.76334607601166),
        new google.maps.LatLng(-21.238247427017434, -43.76335948705673),
        new google.maps.LatLng(-21.238232426781096, -43.76337558031082),
        new google.maps.LatLng(-21.238212426463623, -43.763399720191956),
        new google.maps.LatLng(-21.238197426223714, -43.763431906700134),
        new google.maps.LatLng(-21.238192426143417, -43.7634614109993),
        new google.maps.LatLng(-21.238189926103203, -43.76350164413452),
        new google.maps.LatLng(-21.238202426303857, -43.76352846622467),
        new google.maps.LatLng(-21.238212426463623, -43.763552606105804),
        new google.maps.LatLng(-21.238237426860046, -43.763574063777924),
        new google.maps.LatLng(-21.238264927291223, -43.76359283924103),
        new google.maps.LatLng(-21.238604932198367, -43.76374036073685),
        new google.maps.LatLng(-21.238649932789098, -43.76376450061798),
        new google.maps.LatLng(-21.238669933047223, -43.763772547245026),
        new google.maps.LatLng(-21.2387174336494, -43.7637859582901),
        new google.maps.LatLng(-21.238762434205782, -43.7637859582901),


     ];
     var place_equinocultura = new google.maps.Polygon({
        paths: coords_equinocultura,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
     });
     place_equinocultura.setMap(map);
     
     
     //Usina de Triagem e Compostagem
     var coords_usinaTriagemCompostagem = [
        new google.maps.LatLng(-21.236775127002893, -43.760823120601685),
        new google.maps.LatLng(-21.236800127643058, -43.76076679421237),
        new google.maps.LatLng(-21.236940131149613, -43.760817756183656),
        new google.maps.LatLng(-21.236925130780268, -43.76087408257297),
     ];
     var place_usinaTriagemCompostagem = new google.maps.Polygon({
        paths: coords_usinaTriagemCompostagem,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: "#FF0000",
        fillOpacity: 0.5
     });
     place_usinaTriagemCompostagem.setMap(map);
      

    /* Eventos no mapa */

    google.maps.event.addListener(user, 'dragend', function(){
        //user.getPosition().lng()
        map.setCenter(user.getPosition());
        var pos = user.getPosition();
        alert(pos.lat() + ', ' + pos.lng());
    });

    google.maps.event.addListener(map, 'click', function(ev){
        //alert(ev.latLng.lat() + ', ' + ev.latLng.lng());
    });

    google.maps.event.addListener(place_sede, 'click', function(){
        alert('PRÉDIO SEDE');
    });

    /* Carrega os coletores */
    for(i=0; i < coletores.length; i++) {  
        var marker = new google.maps.Marker({
            position: coletores[i],
            map: map,
            icon: new google.maps.MarkerImage("/static/img/lixeira.png")
        });
    }

    $("#panel").panel("open");
});
