# coding: utf-8

from django.conf.urls.defaults import patterns, include, url

urlpatterns = patterns('',
    url(r'^$', 'geocoleta.mobile_app.views.home'),
    url(r'^ajax_infraestrutura$', 'geocoleta.mobile_app.views.ajax_infraestrutura'),
    url(r'^ajax_locais_coleta$', 'geocoleta.mobile_app.views.ajax_locais_coleta'),
    url(r'^ajax_noticias$', 'geocoleta.mobile_app.views.ajax_noticias'),
    url(r'^ajax_panorama$', 'geocoleta.mobile_app.views.ajax_panorama'),
)
