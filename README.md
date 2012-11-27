GeoColeta
=========

__Uma Aplicação Móvel baseada em Geolocalização para apoio ao Processo de Coleta Seletiva__. Projeto em desenvolvimento para a Semana Nacional de Ciência e Tecnologia 2012, no IF Sudeste de Minas Gerais, Câmpus Barbacena.


Instalação
----------

__Requisitos__: Python e PostgreSQL (ou qualquer outro BD relacional suportado pelo Django)

__Instalação e configuração__:

`git clone https://github.com/rafjaa/GeoColeta.git`

`sudo pip install -r requirements.txt`

`cd GeoColeta/geocoleta-django`

`./manage.py syncdb`

`./manage.py loaddata dump.json`

`./manage.py runserver`
