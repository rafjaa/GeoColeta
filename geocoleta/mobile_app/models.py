# coding: utf-8

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
	tipo = models.ManyToManyField('TipoColetor')
	descricao = models.TextField('Descrição')
	
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
		
#Avaliar se os próximos dois models podem fazer parte dessa app
#ou é melhor criar uma nova app para eles.
class Local(models.Model):
	nome = models.CharField('Nome', max_length=100)
	latitude = models.CharField('Latitude', max_length=50)
	longitude = models.CharField('Longitude', max_length=50)
	descricao = models.TextField('Descrição')
	#Implementação futura.
	#imagem = models.FileField()
	
	def __unicode__(self):
		return u'{0}'.format(self.nome)
	
	class Meta():
		verbose_name = u'Local'
		verbose_name_plural = u'Locais'
		
class Noticia(models.Model):
	titulo = models.CharField('Título', max_length=50)
	corpo = models.TextField('Corpo')
	data = models.DateTimeField(auto_now=True)
	
	def __unicode__(self):
		return u'{0}'.format(self.titulo)
		
	class Meta():
		verbose_name = u'Notícia'
		verbose_name_plural = u'Notícias'
