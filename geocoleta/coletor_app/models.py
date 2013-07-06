#coding:utf-8

from django.db import models

# Create your models here.
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
		return u'{0} - {1}'.format(self.local.descricao, self.data)
		
	class Meta():
		verbose_name = u'Registro'
		verbose_name_plural = u'Registros'	
