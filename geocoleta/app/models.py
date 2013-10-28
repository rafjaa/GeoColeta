# coding: utf-8

from django.db import models

class TipoColetor(models.Model):
	tipo = models.CharField('Tipo', max_length=30)
	
	def __unicode__(self):
		return u'{0}'.format(self.tipo)
		
	class Meta():
		verbose_name = u'Tipo de Coletor'
		verbose_name_plural = u'Tipos de Coletores'


class Coletor(models.Model):
	latitude = models.CharField('Latitude', max_length=50)
	longitude = models.CharField('Longitude', max_length=50)
	descricao = models.TextField('Descrição')
	tipo = models.ManyToManyField('TipoColetor')
	
	def __unicode__(self):
		return u'{0}'.format(self.descricao)
		
	class Meta():
		verbose_name = u'Coletor'
		verbose_name_plural = u'Coletores'


class Registro(models.Model):
	latitude = models.CharField('Latitude', max_length=50)
	longitude = models.CharField('Longitude', max_length=50)
	data = models.DateTimeField(auto_now=True)
	coletor = models.ForeignKey('Coletor')
	tipo_usado = models.ForeignKey('TipoColetor')
	
	def __unicode__(self):
		return u'{0} - {1}'.format(self.coletor.descricao, self.data)
		
	class Meta():
		verbose_name = u'Registro'
		verbose_name_plural = u'Registros'


class Local(models.Model):
	nome = models.CharField('Nome', max_length=100)
	coordenadas = models.TextField('Coordenadas', help_text="Clique no mapa para definir o polígono")
	descricao = models.TextField('Descrição', help_text="Utilize [link] para inserir links")
	
	def __unicode__(self):
		return u'{0}'.format(self.nome)
	
	class Meta():
		verbose_name = u'Local'
		verbose_name_plural = u'Locais'