from django.conf.urls import patterns, include, url
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'app.views.home'),
    url(r'^lixeiras$', 'app.views.lixeiras'),
    url(r'^lixeiras/(\d+)$', 'app.views.lixeira'),
    url(r'^buscar_lixeira$', 'app.views.buscar_lixeira'),
    
    url(r'^gerador$', 'app.views.gerador_log'),
    url(r'^gerar$', 'app.views.adiciona_log'),
)
