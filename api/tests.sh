#!/bin/bash

python manage.py reset_db --noinput
python manage.py migrate
python manage.py test -k