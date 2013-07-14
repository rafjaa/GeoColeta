from django.contrib import admin
from models import *

class PostAdmin(admin.ModelAdmin):
	class Media:
		js = ('/static/js/tinymce/tinymce.min.js', '/static/js/tinymce/textarea.js')

admin.site.register(Coletor)
admin.site.register(TipoColetor)
admin.site.register(Local)
admin.site.register(Registro)
admin.site.register(Noticia, PostAdmin)