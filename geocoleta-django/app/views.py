#coding:utf-8

import json
from datetime import datetime

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.utils.timezone import utc

from moduloColeta.models import *
from haversine import haversine

def home(request):
    locais = LocalColeta.objects.all()
    j = []
    for local in locais:
        j.append({'lat':local.latitude[:11], 'lng':local.longitude[:11], 'descricao':local.descricao,
            'tipo': ', '.join([str(c) for c in local.tipo.all()])})

    obj_json = json.dumps(j)

    return render_to_response('app/index.html', {'dados': obj_json})

def lixeiras(request):
    locais = LocalColeta.objects.all()
    return render_to_response('app/lista_lixeiras.html', {'locais': locais})

def lixeira(request, id_lixeira):
    lixeira = LocalColeta.objects.filter(id=int(id_lixeira))[0]
    tipos = lixeira.tipo.all()
    return render_to_response('app/info_lixeira.html', {'local': lixeira, 'tipos': tipos})

def buscar_lixeira(request):
    lat = request.GET['lat']
    lng = request.GET['lng']
    tipo = request.GET['tipo']
    
    assoc_tipos = ('Plastico', 'Papel', 'Metal/Vidro', 'Organico', 'Nao Reciclavel')
    
    melhor_distancia = 0
    melhor_ponto = None
    
    #Compara a distância do usuário para cada ponto de coleta seletiva
    locais = LocalColeta.objects.filter(tipo__tipo=assoc_tipos[int(tipo)])

    for l in locais:
        dist = haversine(float(lat), float(lng), float(l.latitude), float(l.longitude))

        if not melhor_distancia:
            melhor_distancia = dist
            melhor_ponto = l
        elif dist < melhor_distancia:
            melhor_distancia = dist
            melhor_ponto = l
    
    Log(latitudeUsuario=lat, longitudeUsuario=lng, tipo=TiposColeta.objects.get(tipo=assoc_tipos[int(tipo)]),
        local=melhor_ponto).save()
    
    return HttpResponse(json.dumps({'lat': float(melhor_ponto.latitude), 'lng': float(melhor_ponto.longitude), 'dist': round(melhor_distancia, 1)}), mimetype="application/json")

def gerador_log(request):
    #datetime(2012, 11, 15)
    return render_to_response('app/gerador_log.html', {})

def adiciona_log(request):
    lat = request.GET['lat']
    lng = request.GET['lng']
    tipo = request.GET['tipo'] # 0..4
    data = request.GET['data'] # 10 11 2012

    

    assoc_tipos = ('Plastico', 'Papel', 'Metal/Vidro', 'Organico', 'Nao Reciclavel')
    
    melhor_distancia = 0
    melhor_ponto = None

    locais = LocalColeta.objects.filter(tipo__tipo=assoc_tipos[int(tipo)])

    for l in locais:
        dist = haversine(float(lat), float(lng), float(l.latitude), float(l.longitude))

        if not melhor_distancia:
            melhor_distancia = dist
            melhor_ponto = l
        elif dist < melhor_distancia:
            melhor_distancia = dist
            melhor_ponto = l
    ano, mes, dia = list(reversed(data.split()))

    
    Log(latitudeUsuario=lat, longitudeUsuario=lng, tipo=TiposColeta.objects.get(tipo=assoc_tipos[int(tipo)]),
        local=melhor_ponto, data=datetime(int(ano), int(mes), int(dia), tzinfo=utc)).save()

    return HttpResponse('')
