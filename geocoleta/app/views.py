# coding: utf-8

import json
import re

from django.http import HttpResponse
from django.shortcuts import render_to_response, redirect

from settings import GOOGLE_API_KEY, INSTITUICAO
from app.models import *

from haversine import haversine


def minify_html(view):
    def _view(request, *args, **kwargs):
        response = view(request, *args, **kwargs)
        html = response.content
        html = re.sub(r'\n', '', html)
        html = re.sub(r' +', ' ', html)
        html = re.sub(r'> <', '><', html)
        response.content = html
        return response
    return _view


@minify_html
def home(request):

    # Otimiza as coordenadas do polígono de cada local
    locais_otim = []
    for local in Local.objects.all():
        local.coordenadas = str([[round(c[0], 6), round(c[1], 6)] for c in json.loads(local.coordenadas)]).replace(' ', '')
        locais_otim.append(local)

    return render_to_response('app/index.html',{
        'api_key': GOOGLE_API_KEY,
        'instituicao': INSTITUICAO,
        'coletores': Coletor.objects.all(),
        'locais': locais_otim,
        'tipos': TipoColetor.objects.all()
    })


def projeto(request):
    return redirect('http://www.barbacena.ifsudestemg.edu.br/conteudo/geocoleta')


def ajax_local(request, id_local):
    desc_local = Local.objects.get(id=id_local).descricao
    return HttpResponse(json.dumps(desc_local), mimetype='application/json')


def ajax_descartes(request):
    LIMITE = 100

    registros = Registro.objects.all()
    
    resp = [
        (r.latitude, r.longitude, r.data.strftime('%d/%m/%Y'), r.tipo_usado.id, r.tipo_usado.tipo, r.coletor.descricao)
        for r  in Registro.objects.order_by('-data')[:LIMITE]
    ]
    
    return HttpResponse(json.dumps(resp).replace(', ', ','), mimetype='application/json')    


def ajax_descarte(request, lat, lng, residuo, confirma):

    # Recebe de volta o id do coletor para registrar o descarte
    if int(confirma):
        coletor = Coletor.objects.get(id=int(confirma))
        id_residuo = int(residuo.split('_')[1])
        tipo = TipoColetor.objects.get(id=id_residuo)
        
        Registro(latitude=lat, longitude=lng, coletor=coletor, tipo_usado=tipo).save()
        
        return HttpResponse('', mimetype='application/json')


    # Busca o coletor mais próximo
    melhor_distancia = 0
    melhor_coletor = None
    
    id_residuo = int(residuo.split('_')[1])
    
    coletores = Coletor.objects.filter(tipo__id=id_residuo)
    
    for coletor in coletores:
        dist = haversine(float(lat), float(lng), float(coletor.latitude), float(coletor.longitude))
        
        if not melhor_distancia:
            melhor_distancia = dist
            melhor_coletor = coletor

        elif dist < melhor_distancia:
            melhor_distancia = dist
            melhor_coletor = coletor

    if not melhor_distancia or melhor_distancia > 200:
        return HttpResponse(json.dumps({'id_coletor': False, 'distancia': 0}), mimetype='application/json')

    return HttpResponse(json.dumps({'id_coletor': melhor_coletor.id, 'distancia': round(melhor_distancia, 2)}), mimetype='application/json')
    

def ajax_grafico(request, id_coletor):
    
    registros_coletor = [reg.tipo_usado.id for reg in Registro.objects.filter(coletor__id=id_coletor)]
    total_registros = len(registros_coletor)

    if not total_registros:
        return HttpResponse(json.dumps([]), mimetype='application/json')

    def porcentagem_residuo(id_res):
        return registros_coletor.count(id_res) * 100 / total_registros

    dados_grafico = [(t.tipo, porcentagem_residuo(t.id)) for t in TipoColetor.objects.all()]

    return HttpResponse(json.dumps(dados_grafico).replace(', ', ','), mimetype='application/json')


def not_found_404(request):
    return redirect('/')


def server_error_500(request):
    return redirect('/')
