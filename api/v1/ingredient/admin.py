#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.contrib import admin
from v1.ingredient.models import Ingredient


class IngredientAdmin(admin.ModelAdmin):
    ordering = ['title', 'recipe']
    list_display = ['title', 'quantity', 'measurement']
    list_filter = ['recipe__title']
    search_fields = ['title', 'recipe__title', ]

admin.site.register(Ingredient, IngredientAdmin)
