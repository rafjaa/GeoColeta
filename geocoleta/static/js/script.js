var lat = -21.227959;
var lng = -43.766270;

var TIMEOUT_LOCALIZACAO = 500;
var TENTATIVAS = 20;
var num_tentativa = 0;
var localizado = false;

var exibir_infra = true;
var lista_locais = [];
var lista_desc = [];
var cache_texto_locais = {}

var info_window = new google.maps.InfoWindow(
    { maxWidth: window.innerWidth <= 350 ? 230 : 310 }
);

// Cache para os menus dinâmicos
var html_menu_coletores = '';
var html_menu_relatorios = '';
var html_menu_locais = '';

function restricao_poligonal(){
    var lat1 = -21.226079;
    var lng1 = -43.769629;
    var lat2 = -21.250200;
    var lng2 = -43.757055;

    return lat < lat1 && lat > lat2 && lng > lng1 && lng < lng2;
}

function limpar_registros(){
    info_window.setMap(null);
    for (var r in lista_desc){
        lista_desc[r].setMap(null);
    }
    lista_desc = [];
}

function info_coletor(id){
    var coletor = coletores[id];
    
    info_window.setPosition(new google.maps.LatLng(coletor[0] + 0.00015, coletor[1]));
    info_window.setContent('<h2 class="titulo_window">' + coletor[2] + '</h2><strong>Resíduos: </strong> <span>' + coletor[3].join('</span>, <span>') + '.</span><div style="text-align:center;margin:12px 0 5px"><button onclick="gerar_grafico(' + id + ')">Visualizar gráfico de uso</button></div>');
       
    Lungo.Aside.hide();
    info_window.open(map);

    map.setCenter(info_window.getPosition());
}

function info_local(id, pos){
    var local = locais[id];

    info_window.setPosition(pos);
    Lungo.Aside.hide();
  
    if(cache_texto_locais[id]){
        info_window.setContent('<h2 class="titulo_window">' + local[0] + '</h2><span class="descricao">' + cache_texto_locais[id]) + '</span>';
        info_window.open(map);
    } else{
        msg_carregando();

        Lungo.Service.get('ajax_local/' + id, '',
            function(texto){
                cache_texto_locais[id] = texto
                info_window.setPosition(pos);
                info_window.setContent('<h2 class="titulo_window">' + local[0] + '</h2><span class="descricao">' + cache_texto_locais[id] + '</span>');
                info_window.open(map);
            }, 'text');
    }

    map.setCenter(pos);
}

function confirmar_descarte(url){
    msg_carregando();

    Lungo.Service.get(url, '', function(r){
            info_window.setContent('<strong>Obrigado por colaborar com o estudo do processo de coleta seletiva no Câmpus!</strong><br><br>Compartilhe no <a class="link-social" data-icon="facebook-sign" target="_blank" href="http://www.facebook.com/sharer.php?u=http://geocoleta.org" target="_blank">Facebook</a>, <a class="link-social" href="https://twitter.com/intent/tweet?source=tweetbutton&text=Estou contribuindo com o processo de coleta seletiva no IF Barbacena&url=http://geocoleta.org" target="_blank">Twitter</a> ou <a class="link-social" href="https://plus.google.com/share?url=geocoleta.org" target="_blank">G+</a>!');
            info_window.open(map);
            
        }, 'json');
}

function gerar_grafico(id_coletor){
    msg_carregando();

    Lungo.Service.get('ajax_grafico/' + id_coletor,
            '', function(data){

                var coletor = coletores[id_coletor];            

                info_window.setMap(null);
                info_window.setPosition(new google.maps.LatLng(coletor[0] + 0.0002, coletor[1]));
                info_window.setContent('<h2 class="titulo_window" style="width: 95%">' + coletor[2] + '</h2><span><div id="container" style="width: 235px; height: 190px; margin: 0 auto"></div>');
                info_window.open(map);
                map.setCenter(info_window.getPosition());

                Lungo.Aside.hide();

                if(!data.length){
                    info_window.setContent('<h2 class="titulo_window" style="width: 95%">' + coletor[2] + '</h2><div style="width: 95%">Não há registros de descarte para este coletor.</div>');
                    return;
                }
                
                $('#container').highcharts({
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            marginRight: 15

                        },
                        title: false,
                        tooltip: {
                            pointFormat: '<strong>{point.y}% dos descartes</strong>'
                        },
                        credits: {
                              enabled: false
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            }
                        },
                        colors: ['#214f83', '#990000', '#006654', '#993300', '#666666'],
                        series: [{
                            type: 'pie',
                            name: 'Descartes',
                            data: data
                    }]
                });

            }, 'json');
}

function msg_carregando(){
    info_window.setContent('<img src="/static/img/loading.gif">');
    info_window.open(map);
}

Lungo.ready(function(){

    obter_localizacao = function(position){
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        // Elimina a coordenada de baixa precisão de Barbacena
        if(latitude != -21.2296593 || longitude != -43.7715839){
            lat = latitude;
            lng = longitude;
            localizado = 1;
        }            
    }
    
    callback_erro = function(error){        
        localizado = -1;
    }
    
    // Inicia a detecção da localização do usuário
    navigator.geolocation.getCurrentPosition(obter_localizacao, callback_erro);
    
    function aguarda_localizacao(){ 
        if (!localizado && num_tentativa < TENTATIVAS) {

            setTimeout(aguarda_localizacao, TIMEOUT_LOCALIZACAO);
            num_tentativa += 1;

        } else{
            map = new google.maps.Map(document.getElementById("map-canvas"), {
                center: new google.maps.LatLng(lat, lng),
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.SATELLITE
            });
            
            user = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: map,
                draggable: true
            });
            
            google.maps.event.addListener(user,'dragend',function(event) {
                lat = user.getPosition().lat();
                lng = user.getPosition().lng();
            });

            google.maps.event.addListener(user,'dragstart',function(event){
                info_window.setMap(null);
            });
            
            // Exibe a mensagem inicial para o usuário
            info_window.setPosition(new google.maps.LatLng(lat + 0.0002, lng));
            
            if(localizado == 1){

                // Checa se o usuário se encontra nos limites do câmpus
                if(!restricao_poligonal()){
                    lat = -21.227959;
                    lng = -43.766270;
                    map.setCenter(new google.maps.LatLng(lat, lng));
                    user.setPosition(new google.maps.LatLng(lat, lng));
                    info_window.setPosition(new google.maps.LatLng(lat + 0.0002, lng));
                    info_window.setContent('Sua localização não se encontra nos limites do Câmpus Barbacena!');
                } else{

                    info_window.setContent('<h2 class="titulo_window">Sua localização foi detectada:</h2><strong>Latitude: </strong>' +
                    lat.toFixed(6) + ' Sul<br><strong>Longitude: </strong>' + lng.toFixed(6) +
                    ' Oeste');                
                }
            } else{

                info_window.setContent('<h2 class="titulo_window">Não foi possível determinar sua localização!</h2>Arraste o marcador vermelho para alterá-la manualmente.');
                
            }

            info_window.open(map);
            
            // Exibe os coletores
            for(var i in coletores){

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(coletores[i][0], coletores[i][1]),
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: new google.maps.MarkerImage("/static/img/coletor.png"),
                    id: i
                });

                google.maps.event.addListener(marker, 'click', function(){
                    info_coletor(this.id);                    
                });
            }
            
            // Destaca a infraestrutura
            if(!locais['vazio']){
                for(var i in locais){
                    var coord;
                    var paths_local = [];
                    
                    // Utilizada para obter a coordenada central do local
                    var bounds = new google.maps.LatLngBounds();

                    for(var j=0; j < locais[i][1].length; j++){
                        coord = new google.maps.LatLng(locais[i][1][j][0], locais[i][1][j][1]);
                        paths_local.push(coord);
                        bounds.extend(coord);
                    }

                    var local = new google.maps.Polygon({
                        map: map,
                        paths: paths_local,
                        strokeColor: "#7a5512",
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        fillColor: "#7a5512",
                        fillOpacity: 0.5,
                        position: bounds.getCenter(),
                        id: i
                    });
                    
                    locais[i].push(bounds.getCenter());

                    google.maps.event.addListener(local, 'click', function(){                    
                        info_local(this.id, this.position);                    
                    });
                    
                    lista_locais.push(local);
                }
            }        
        }    
    };

    aguarda_localizacao();
    Lungo.Aside.show();
    
    // Botão para exibir/ocultar a infraestrutura
    Lungo.dom("#fieldset_infra").tap(function(){

        var visibilidade = exibir_infra ? null : map;
        
        for(var i=0; i < lista_locais.length; i++){
            lista_locais[i].setMap(visibilidade);
        }

        exibir_infra = exibir_infra ? false : true;
    });
    
    // Menu lateral
    
    var html_menu = Lungo.dom('#article_menu').html();

    // Função para voltar ao menu principal
    voltar_menu = function(){
        Lungo.dom('#article_menu').html(html_menu);
        Lungo.dom('#header_menu > h1').text('Ferramentas');
    }

    Lungo.dom('#opt_centralizar').tap(function(){
        map.setCenter(user.getPosition());
        Lungo.Aside.hide();
    });

    Lungo.dom('#opt_infra').tap(function(){
        if(locais['vazio'])
            return;

        Lungo.dom('#header_menu > h1').text('Infraestrutura');
        
        if(html_menu_locais == ''){
            var html_lista_locais = '';
            
            for(var i in locais){
                html_lista_locais += '<li><a href="#" onclick="info_local(' + i + ',new google.maps.LatLng' + locais[i][2] + ')"><p class="text small">' + locais[i][0] + '</p></a></li>'
            }
            
            html_menu_locais = '\
                <ul>\
                <li data-view-article="main-article">\
                    <a href="#" onclick="voltar_menu()">\
                        <strong>Voltar</strong>\
                    </a>\
                </li>' + html_lista_locais + '</ul><div style="visibility:hidden; text-indent:100%">0</div>';
        }
        
        Lungo.dom('#article_menu').html(html_menu_locais);
    });

    Lungo.dom('#opt_coletores').tap(function(){
        if(coletores['vazio'])
            return;

        Lungo.dom('#header_menu > h1').text('Coletores');
            
        if(html_menu_coletores == ''){
            var html_lista_coletores = '';
            
            for(var i in coletores){
                html_lista_coletores += '<li><a href="#" onclick="info_coletor(' + i + ')"><p class="text small">' + coletores[i][2] + '</p><span class="tag">' + coletores[i][3].join('</span> <span class="tag">') + '</span></a></li>';
            }
        
            html_menu_coletores = '\
                <ul>\
                <li data-view-article="main-article">\
                    <a href="#" onclick="voltar_menu()">\
                        <strong>Voltar</strong>\
                    </a>\
                </li>' + html_lista_coletores + '</ul>';
        }
            
        Lungo.dom('#article_menu').html(html_menu_coletores);
    });

    Lungo.dom('#opt_noticias').tap(function(){
        atualizar_menu('ajax_noticias');
    });

    Lungo.dom('#opt_rel_descartes').tap(function(){

        Lungo.Aside.hide();
        limpar_registros();
        
        var desc_menu = Lungo.dom('#txt_desc');        
        var msg = 'Limpar tela';
        
        if(desc_menu.text() == msg){
            desc_menu.text('Descartes')
            return;
        }

        msg_carregando();
        desc_menu.text(msg);

        Lungo.Service.get('ajax_descartes', '',
            function(reg){

                if(!reg.length){
                    info_window.setContent('Não há registros de descartes!');
                    return;
                }

                var obj;
                for(i in reg){
                    obj = reg[i];
                    var r = new google.maps.Marker({
                        position: new google.maps.LatLng(obj[0], obj[1]),
                        map: map,
                        animation: google.maps.Animation.DROP,
                        icon: new google.maps.MarkerImage('/static/img/marker' + obj[3] + '.png'),
                        data: obj[2],
                        tipo: obj[4],
                        desc: obj[5]
                    });
                    
                    lista_desc.push(r);

                    google.maps.event.addListener(r, 'click', function(){

                        info_window.setPosition(new google.maps.LatLng(this.position.lat() + 0.0002, this.position.lng()));
                        info_window.setContent('<h2 class="titulo_window">' + this.data + '</h2><div style="width: 98%">Resíduo do tipo <strong>' + this.tipo.toLowerCase() + '</strong> descartado no coletor <strong>"' + this.desc + '"</strong>.</div>');
                        info_window.open(map);
                        
                    });
                }

                map.setCenter(new google.maps.LatLng(obj[0], obj[1]));
                info_window.setMap(null);
                
            }, 'json');
    });

    Lungo.dom('#opt_rel_coletores').tap(function(){

        if(coletores['vazio'])
            return;

        Lungo.dom('#header_menu > h1').text('Relatórios');
            
        if(html_menu_relatorios == ''){
            var html_lista_relatorios = '';

            for(var i in coletores){
                html_lista_relatorios += '<li><a href="#" onclick="gerar_grafico(' + i + ')"><p class="text small">' + coletores[i][2] + '</p><span class="tag blue">' + coletores[i][3].join('</span> <span class="tag blue">') + '</span></a></li>';
            }

            html_menu_relatorios = '\
                <ul>\
                <li data-view-article="main-article">\
                    <a href="#" onclick="voltar_menu()">\
                        <strong>Voltar</strong>\
                    </a>\
                </li>' + html_lista_relatorios + '</ul>';
        }

        Lungo.dom('#article_menu').html(html_menu_relatorios);
    });
        
    
    // Descarte
    Lungo.dom("nav#descarte a").tap(function(){

        Lungo.Aside.hide();
        msg_carregando();

        var url_base = 'ajax_descarte/' + lat + '/' + lng + '/' + Lungo.dom(this)[0].id;

        Lungo.Service.get(url_base + '/0', // Sem confirmação automática de descarte
            '', function(data){
                    // Checa se não há coletores com suporte
                    if(data['id_coletor'] == false){
                        info_window.setPosition(new google.maps.LatLng(lat + 0.0002, lng));
                        info_window.setContent('Não foram encontrados coletores próximos com suporte a este tipo de resíduo.');
                    } else{
                        var coletor = coletores[data['id_coletor']];
                        var distancia = data['distancia'];
                        info_window.setPosition(new google.maps.LatLng(coletor[0] + 0.00015, coletor[1]));
                        info_window.setContent('<h2 class="titulo_window">' + coletor[2] + '</h2><strong>Resíduos:</strong> <span>' + coletor[3].join('</span>, <span>') + '</span>.<div style="text-align: center"><div style="font-size: 30px; color: #333; text-shadow: 1px 1px #aaa;">' + distancia.toString().replace('.', ',') + '</div><div style="letter-spacing: 1px">METROS</div><button style="margin-top: 15px;" onclick="confirmar_descarte(\'' + url_base + '/' + data['id_coletor'] + '\')">Confirmar descarte</button></div>');
                    }

                    info_window.open(map);
                    map.setCenter(info_window.getPosition());          
            }, 'json');

    });
    
    // Lida com a orientação da tela
    window.addEventListener("orientationchange", function() {
        if(window.orientation){ // Tela na horizontal
            Lungo.dom('.ocultar_h').hide();
            info_window.maxWidth += 110;
        } else{
            Lungo.dom('.ocultar_h').show();
            info_window.maxWidth -= 110;
        }
    }, false);    
});
