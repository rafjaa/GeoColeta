# coding: utf-8

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.conf.urls.defaults import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'geocoleta.views.home'),
    url(r'^app/', include('geocoleta.mobile_app.urls')),

    url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += staticfiles_urlpatterns()
