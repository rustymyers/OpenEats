#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.contrib import admin
from .models import Recipe
from imagekit.admin import AdminThumbnail
from v1.ingredient.models import Ingredient
from django.shortcuts import render_to_response
from django.conf import settings


class RecipeAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'pub_date']
    list_filter = ['author', 'course', 'cuisine']
    search_fields = ['author__username', 'title',]

admin.site.register(Recipe, RecipeAdmin)
