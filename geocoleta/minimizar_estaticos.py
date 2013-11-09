# coding: utf-8

'''
	"Minimiza" e une automaticamente os arquivos estáticos:

		jquery.min.js + script.js -> jquery.script.min.js
		lungo.theme.css + style.css -> lungo.theme.style.min.css

		python minimizar_estaticos.py [js|css]
'''

from sys import argv
import urllib


def minify(codigo, tipo):
	APIS = {
		'js': 'http://javascript-minifier.com/raw',
		'css': 'http://cssminifier.com/raw'
	}

	args = urllib.urlencode({'input': codigo})
	req = urllib.urlopen(APIS[tipo], args)

	return req.read()


if __name__ == '__main__':

	STATIC = './static'

	# Arquivos JavaScript
	if len(argv) == 1 or 'js' in argv:

		print 'Comprimindo arquivos JavaScript'

		src_jquery_min = open(STATIC + '/js/jquery-1.10.2.min.js').read()
		src_script = open(STATIC + '/js/script.js').read()
		
		src_script_min = minify(src_script, 'js')

		with open(STATIC + '/js/jquery.script.min.js', 'w') as f:
			f.write(src_jquery_min + '\n\n' + src_script_min)


	# Arquivos css
	if len(argv) == 1 or 'css' in argv:

		print 'Comprimindo arquivos CSS'

		src_lungo_theme = open(STATIC + '/css/lungo/lungo.theme.css').read()
		src_style = open(STATIC + '/css/style.css').read()
		
		src_lungo_theme_min = minify(src_lungo_theme, 'css')
		src_style_min = minify(src_style, 'css')

		with open(STATIC + '/css/lungo.theme.style.min.css', 'w') as f:
			f.write(src_lungo_theme_min + '\n\n' + src_style_min)


		src_lungo = open(STATIC + '/css/lungo/lungo.css').read()
		src_lungo_min = minify(src_lungo, 'css')

		with open(STATIC + '/css/lungo/lungo.min.css', 'w') as f:
			f.write(src_lungo_min)