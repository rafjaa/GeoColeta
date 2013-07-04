# coding: utf-8

from django.conf.urls.defaults import patterns, include, url

urlpatterns = patterns('',
    url(r'^$', 'geocoleta.mobile_app.views.home'),
)
