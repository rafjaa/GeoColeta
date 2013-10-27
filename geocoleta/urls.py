# coding: utf-8

from django.conf.urls.defaults import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'app.views.home'),
    url(r'^projeto/$', 'app.views.projeto'),
    
    url(r'^ajax_local/(\d+)$', 'app.views.ajax_local'),
    url(r'^ajax_descartes$', 'app.views.ajax_descartes'),
    url(r'^ajax_descarte/(.+?)/(.+?)/(.+?)/(.+?)$', 'app.views.ajax_descarte'),
    url(r'^ajax_grafico/(\d+)$', 'app.views.ajax_grafico'),

    # Django Admin
    url(r'^admin/', include(admin.site.urls)),
)
