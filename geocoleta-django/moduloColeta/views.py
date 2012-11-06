#coding:utf-8
# Create your views here.

from django.shortcuts import render_to_response
from django.utils import simplejson as json
from models import LocalColeta

def home(request):
	return render_to_response("index.html", {})

def mapa(request):
	locaisColeta = LocalColeta.objects.all()
	d = []
	for local in locaisColeta:
		d.append({"latitude":local.latitude, "longitude":local.longitude, "descricao":local.descricao,
		'tipos':str(parse_tipo(local.tipo.all()))})
	objJason = json.dumps(d)
	return render_to_response("mapa.html", {"locaisColeta": objJason})

#Aqui acontece a mágica!
def parse_tipo(classe):
	s = []
	for c in classe:
		s.append(str(c))
	return ' , '.join(s)
