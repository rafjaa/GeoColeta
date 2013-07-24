# coding: utf-8

import json

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext

from mobile_app import models

def home(request):
    return render_to_response('mobile_app/home.html',
    		{
    			'qtd_noticias': models.Noticia.objects.count(),
    			'qtd_coletores': models.Coletor.objects.count(),
    			'coletores': models.Coletor.objects.all(),
    		},
            context_instance=RequestContext(request))


def ajax_infraestrutura(request):
	return render_to_response('mobile_app/ajax_infraestrutura.html')

def ajax_coletores(request):
	return render_to_response('mobile_app/ajax_coletores.html',
			{'coletores': models.Coletor.objects.all()})

def ajax_noticias(request):
	return render_to_response('mobile_app/ajax_noticias.html',
			{'noticias': models.Noticia.objects.all()})

def ajax_panorama(request):
    coordenadas = models.Registro.objects.values_list('latitude', 'longitude')
    return HttpResponse(json.dumps(tuple(coordenadas)), mimetype='application/json')

def ajax_estatisticas_coletor(request):
    return render_to_response('mobile_app/ajax_estatisticas_coletor.html',
            {'coletores': models.Coletor.objects.all()})