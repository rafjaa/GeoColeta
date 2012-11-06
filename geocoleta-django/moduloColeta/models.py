#coding:utf-8
from django.db import models

# Create your models here.

class TiposColeta(models.Model):
	tipo = models.CharField(max_length=30)
	def __unicode__(self):
		return self.tipo

class LocalColeta(models.Model):
	latitude = models.CharField(max_length=100)
	longitude = models.CharField(max_length=100)
	descricao = models.TextField('Descrição')
	tipo = models.ManyToManyField('TiposColeta')
	def __unicode__(self):
		return self.descricao


class Log(models.Model):
	latitudeUsuario = models.CharField(max_length=100)
	longitudeUsuario = models.CharField(max_length=100)
	local = models.ForeignKey('LocalColeta')
	data = models.DateTimeField()
	tipo = models.ForeignKey('TiposColeta')
