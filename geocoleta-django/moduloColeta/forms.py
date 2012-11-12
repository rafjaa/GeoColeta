#coding: utf-8
from django import forms
from models import TiposColeta

class Filtro(forms.Form):
	SEMANA = 'semana'
	MES = 'mes'
	ANO = 'ano'
	TODOS = 'todos'
	OPCOES = ((TODOS, 'Todos'),
		(MES, 'Mês'),
		(SEMANA, 'Semana'),
		(ANO , 'Ano'),
		)

	periodo = forms.ChoiceField(choices=OPCOES)
	coleta = forms.ModelChoiceField(queryset=TiposColeta.objects.all())