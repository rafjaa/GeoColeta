# coding: utf-8

'''
	"Minimiza" e une automaticamente os arquivos estáticos:
		jquery.min.js + script.js -> jquery.script.min.js
		lungo.theme.css + style.css -> lungo.theme.style.min.css
'''

import urllib


def minify(codigo, tipo):
	APIS = {
		'js': 'http://javascript-minifier.com/raw',
		'css': 'http://cssminifier.com/raw'
	}

	args = urllib.urlencode({'input': codigo})
	req = urllib.urlopen(APIS[tipo], args)

	return req.read()