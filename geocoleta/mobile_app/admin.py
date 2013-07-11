from models import TipoColetor
from models import Coletor
from models import Local
from models import Noticia

from django.contrib import admin

class PostAdmin(admin.ModelAdmin):
	class Media:
		js = ('/static/js/tinymce/tinymce.min.js', '/static/js/tinymce/textarea.js')

admin.site.register(Coletor)
admin.site.register(TipoColetor)
admin.site.register(Local)
admin.site.register(Noticia, PostAdmin)