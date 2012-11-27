#coding:utf-8
# Create your views here.

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.paginator import Paginator
from django.http import HttpResponse

import json
from models import LocalColeta
from models import TiposColeta
from models import Log
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
			d.append({'latitude':local.latitude[:11], 'longitude':local.longitude[:11], 'descricao':local.descricao,
			'tipo':parse_tipo(local.tipo.all())})
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
					jsonString.append({'latitude': atual.latitudeUsuario, 'longitude' : atual.longitudeUsuario, 'localColeta': atual.local.descricao,
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
					jsonString.append({'latitude': atual.latitudeUsuario, 'longitude' : atual.longitudeUsuario, 'localColeta': atual.local.descricao,
					'data': atual.data.strftime("%d/%m/%y"), 'tipo':atual.tipo.tipo})

				objJason = json.dumps(jsonString)

				form = Filtro()

				return render_to_response('mapa.html', {'dados': objJason, 'formFiltro': form}, context_instance=RequestContext(request))

			elif filtros['periodo'] == 'mes':
				date = datetime.now()
				logs = Log.objects.filter(tipo=filtros['coleta'], data__month=date.month, data__year=date.year)				
				
				jsonString = []
				for atual in logs:
					jsonString.append({'latitude': atual.latitudeUsuario, 'longitude' : atual.longitudeUsuario, 'localColeta': atual.local.descricao,
					'data': atual.data.strftime("%d/%m/%y"), 'tipo':atual.tipo.tipo})

				objJason = json.dumps(jsonString)

				form = Filtro()
				return render_to_response('mapa.html', {'dados': objJason, 'formFiltro': form}, context_instance=RequestContext(request))				


			elif filtros['periodo'] == 'ano':
				date = datetime.now()
				logs = Log.objects.filter(tipo=filtros['coleta'], data__year=date.year)

				jsonString = []
				for atual in logs:
					jsonString.append({'latitude': atual.latitudeUsuario, 'longitude' : atual.longitudeUsuario, 'localColeta': atual.local.descricao,
					'data': atual.data.strftime("%d/%m/%y"), 'tipo':atual.tipo.tipo})

				objJason = json.dumps(jsonString)

				form = Filtro()
				return render_to_response('mapa.html', {'dados': objJason, 'formFiltro': form}, context_instance=RequestContext(request))

def coletas(request):
	if request.is_ajax():
		id_log = request.GET['id']
		semana = datetime.now().isocalendar()[1]
		ano = datetime.now().year
		mes = datetime.now().month
	
		#logs = Log.objects.filter(data__month=mes,data__year=ano, data__week_day=semana)
		logs = Log.objects.filter(local=id_log)

		#sys.stderr.write(str(logs))
		
		resposta = {}
		resposta['Papel'] = [0,0,0,0,0,0,0]
		resposta['Plastico'] = [0,0,0,0,0,0,0]
		resposta['Metal/Vidro'] = [0,0,0,0,0,0,0]
		resposta['Organico'] = [0,0,0,0,0,0,0]
		resposta['Nao Reciclavel'] = [0,0,0,0,0,0,0]
		resposta['soma'] = [0,0,0,0,0,0,0]

		for l in logs:
			if l.data.isocalendar()[2] == 1:
				resposta[l.tipo.tipo][1] += 1
				resposta['soma'][1] += 1
			elif l.data.isocalendar()[2] == 2:
				resposta[l.tipo.tipo][2] += 1
				resposta['soma'][2] += 1
			elif l.data.isocalendar()[2] == 3:
				resposta[l.tipo.tipo][3] += 1
				resposta['soma'][3] += 1
			elif l.data.isocalendar()[2] == 4:
				resposta[l.tipo.tipo][4] += 1
				resposta['soma'][4] += 1
			elif l.data.isocalendar()[2] == 5:
				resposta[l.tipo.tipo][5] += 1
				resposta['soma'][5] += 1
			elif l.data.isocalendar()[2] == 6:
				resposta[l.tipo.tipo][6] += 1
				resposta['soma'][6] += 1
			elif l.data.isocalendar()[2] == 7:
				resposta[l.tipo.tipo][0] += 1
				resposta['soma'][0] += 1		

		respostaJson = json.dumps(resposta)

		return HttpResponse(respostaJson)
	elif request.method == 'GET':
		locaisColeta = LocalColeta.objects.all().order_by('id')
		log = Log.objects.all()

		paginator = Paginator(locaisColeta, 9)

		form = Filtro()

		try:
			page = int(request.GET.get('page', '1'))
		except ValueError:
			page = 1

		try:
			locais = paginator.page(page)
		except (EmptyPage, InvalidPage):
			locais = paginator.page(paginator.num_pages)

		return render_to_response('coletas.html', 
			{'locaisColetaPag': locais, 'formFiltro':form, 'logs': log})


#Aqui acontece a mágica!
def parse_tipo(classe):
	s = []
	for c in classe:
		s.append(str(c))
	return s

	
