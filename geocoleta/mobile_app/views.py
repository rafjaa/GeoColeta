# coding: utf-8

#from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext

def home(request):
    return render_to_response('mobile_app/home.html', 
                context_instance=RequestContext(request))


def ajax_infraestrutura(request):
	return render_to_response('mobile_app/ajax_infraestrutura.html')

def ajax_locais_coleta(request):
	return render_to_response('mobile_app/ajax_locais_coleta.html')

def ajax_noticias(request):
	return render_to_response('mobile_app/ajax_noticias.html')