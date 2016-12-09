#!/usr/bin/env python
# encoding: utf-8

# Name for imgur.com This file will create a thumbnail
# for the default image if it doesn't exists and return the path

from django.core.management.base import BaseCommand, CommandError
from imagekit import ImageSpec
from imagekit.processors import ResizeToFill
from django.conf import settings


class Thumbnail(ImageSpec):
    processors = [ResizeToFill(300, 200)]
    format = 'JPEG'
    options = {'quality': 80}


class Command(BaseCommand):
    help = "Generates a thumbnail for recipes that don't have a photo"

    def handle(self, *args, **options):
        result = ''

        with open(settings.PROJECT_PATH + '/base/default.png') as source_file:
            image_generator = Thumbnail(source=source_file)
            result = image_generator.generate()

        with open(settings.MEDIA_ROOT + '/default_thumbnail.png', 'w') as dest:
            dest.write(result.read())
