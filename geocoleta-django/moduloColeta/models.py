#coding:utf-8
from django.db import models

# Create your models here.

class TiposColeta(models.Model):
	tipo = models.CharField(max_length=30)

	def __unicode__(self):
		return u'{0}'.format(self.tipo)

	class Meta():
		verbose_name = u'Tipo de Coleta'
		verbose_name_plural = u'Tipos de Coleta'

class LocalColeta(models.Model):
	latitude = models.CharField(max_length=100)
	longitude = models.CharField(max_length=100)
	descricao = models.TextField('Descrição')
	tipo = models.ManyToManyField('TiposColeta')

	def __unicode__(self):
		return self.descricao

	class Meta():
		verbose_name = u'Local de Coleta'
		verbose_name_plural = u'Locais de Coleta'


class Log(models.Model):
	latitudeUsuario = models.CharField(max_length=100)
	longitudeUsuario = models.CharField(max_length=100)
	local = models.ForeignKey('LocalColeta')
	data = models.DateTimeField(auto_now=True)
	tipo = models.ForeignKey('TiposColeta')

	def __unicode__(self):
		return u'{0} - {1}'.format(self.local.descricao, self.data)
