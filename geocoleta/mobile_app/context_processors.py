# coding: utf-8

from django.conf import settings

def google_api_key(request):
    return {'GOOGLE_API_KEY': settings.GOOGLE_API_KEY}

def institution(request):
    return {'INSTITUTION': settings.INSTITUTION}
