#coding:utf-8
# Create your views here.

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.paginator import Paginator

import json
from models import LocalColeta
from models import TiposColeta
from models import Log
from forms import Filtro

import sys
from datetime import datetime

def home(request):
	return render_to_response("index.html", {})

def mapa(request):

	if request.method == 'GET':
		tiposColeta = TiposColeta.objects.all()
		locaisColeta = LocalColeta.objects.all()
		d = []
		for local in locaisColeta:
			d.append({'latitude':local.latitude, 'longitude':local.longitude, 'descricao':local.descricao,
			'tipos':parse_tipo(local.tipo.all())})
		objJason = json.dumps(d)

		form = Filtro()

		return render_to_response('mapa.html', {'dados': objJason, 'formFiltro': form}, context_instance=RequestContext(request))
	else:
		form = Filtro(request.POST, request.FILES)
		if form.is_valid():
			filtros = form.cleaned_data

			if filtros['periodo'] == 'todos':
				log = Log.objects.filter(tipo=filtros['coleta'])
				jsonString = []

				for atual in log:
					jsonString.append({'latitudeUsuario': atual.latitudeUsuario, 'longitudeUsuario' : atual.longitudeUsuario, 'localColeta': atual.local.descricao,
					'data': atual.data.strftime("%d/%m/%y"), 'tipo':atual.tipo.tipo})

				objJason = json.dumps(jsonString)

				form = Filtro()

				return render_to_response('mapa.html', {'dados': objJason,'formFiltro': form}, context_instance=RequestContext(request))

			elif filtros['periodo'] == 'semana':
				semana = datetime.now().isocalendar()[1]
				date = datetime.now()
				mes = datetime.now().month
				logs = []

				candidatos = Log.objects.filter(tipo=filtros['coleta'], data__month=date.month, data__year=date.year)

				for atual in candidatos:
					if atual.data.isocalendar()[1] == semana:
						logs.append(atual)

				jsonString = []
				for atual in logs:
					jsonString.append({'latitudeUsuario': atual.latitudeUsuario, 'longitudeUsuario' : atual.longitudeUsuario, 'localColeta': atual.local.descricao,
					'data': atual.data.strftime("%d/%m/%y"), 'tipo':atual.tipo.tipo})

				objJason = json.dumps(jsonString)

				form = Filtro()

				return render_to_response('mapa.html', {'dados': objJason, 'formFiltro': form}, context_instance=RequestContext(request))

			elif filtros['periodo'] == 'mes':
				date = datetime.now()
				logs = Log.objects.filter(tipo=filtros['coleta'], data__month=date.month, data__year=date.year)				
				
				jsonString = []
				for atual in logs:
					jsonString.append({'latitudeUsuario': atual.latitudeUsuario, 'longitudeUsuario' : atual.longitudeUsuario, 'localColeta': atual.local.descricao,
					'data': atual.data.strftime("%d/%m/%y"), 'tipo':atual.tipo.tipo})

				objJason = json.dumps(jsonString)

				form = Filtro()
				return render_to_response('mapa.html', {'dados': objJason, 'formFiltro': form}, context_instance=RequestContext(request))				


			elif filtros['periodo'] == 'ano':
				date = datetime.now()
				logs = Log.objects.filter(tipo=filtros['coleta'], data__year=date.year)

				jsonString = []
				for atual in logs:
					jsonString.append({'latitudeUsuario': atual.latitudeUsuario, 'longitudeUsuario' : atual.longitudeUsuario, 'localColeta': atual.local.descricao,
					'data': atual.data.strftime("%d/%m/%y"), 'tipo':atual.tipo.tipo})

				objJason = json.dumps(jsonString)

				form = Filtro()
				return render_to_response('mapa.html', {'dados': objJason, 'formFiltro': form}, context_instance=RequestContext(request))

def coletas(request):
	tiposColeta = TiposColeta.objects.all()
	locaisColeta = LocalColeta.objects.all()

	paginator = Paginator(locaisColeta, 10)

	try:
		page = int(request.GET.get('page', '1'))
	except ValueError:
		page = 1

	try:
		locais = paginator.page(page)
	except (EmptyPage, InvalidPage):
		locais = paginator.page(paginator.num_pages)

	d = []
	for local in locaisColeta:
		d.append({'latitude':local.latitude, 'longitude':local.longitude, 'descricao':local.descricao,
		'tipos':parse_tipo(local.tipo.all())})
	
	return render_to_response('coletas.html', {'locaisColeta': locaisColeta, 'tiposColeta': tiposColeta, 'locaisColetaPag': locais})

#Aqui acontece a mágica!
def parse_tipo(classe):
	s = []
	for c in classe:
		s.append(str(c))
	return s

	
