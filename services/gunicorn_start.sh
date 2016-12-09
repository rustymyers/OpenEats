#!/bin/bash

NAME="OpenEats"                                   # Name of the application
DJANGODIR=/home/ryan/www/openeats                 # Django project directory
USER=www-data                                     # the user to run as
GROUP=www-data                                    # the group to run as
NUM_WORKERS=5                                     # how many worker processes should Gunicorn spawn
DJANGO_SETTINGS_MODULE=base.settings                   # which settings file should Django use
DJANGO_WSGI_MODULE=base.wsgi                           # WSGI module name

echo "Starting $NAME as `whoami`"

# Activate the virtual environment
cd $DJANGODIR
source /home/ryan/.virtualenvs/openeats/bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
exec gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user=$USER --group=$GROUP \
  --bind=localhost:8001