GeoColeta
=========

Projeto para a Semana Nacional de Ciência e Tecnologia 2012, IF Sudeste de Minas Gerais, Câmpus Barbacena.


Instalação
----------

__Requisitos__: Python e PostgreSQL (ou qualquer outro BD relacional suportado pelo Django)

`git clone https://github.com/rafjaa/GeoColeta.git`

`sudo pip install -r requirements.txt`

`cd GeoColeta/geocoleta-django`

`./manage.py syncdb`

`./manage.py loaddata dump.json`

`./manage.py runserver`
