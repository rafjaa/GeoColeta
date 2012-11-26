GeoColeta
=========

Projeto para a Semana Nacional de Ciência e Tecnologia 2012, IF Sudeste de Minas Gerais, Câmpus Barbacena.


Instalação
----------

Requisitos: Python e PostgreSQL (ou outro BD relacional suportado pelo Django)

sudo pip install -r requirements.txt
cd geocoleta-django
./manage.py syncdb
./manage.py loaddata dump.json
./manage.py runserver
