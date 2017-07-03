#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.contrib import admin
from .models import GroceryList, GroceryItem, \
                   GroceryShared, GroceryRecipe
from .serializers import GroceryItemSerializer


class GroceryListInline(admin.TabularInline):
    model = GroceryItem
    ser = GroceryItemSerializer


class GroceryListAdmin(admin.ModelAdmin):
    list_display = ['title', 'author']
    list_filter = ['author']
    search_fields = ['author__username', 'title']
    ordering = ['author__username', 'title']


class GroceryItemAdmin(admin.ModelAdmin):
    list_display = ['list', 'title', 'listAuthor']
    list_filter = ['list', 'list__author']
    ordering = ['list', 'title']
    search_fields = ['list']

    def listAuthor(self, obj):
        return obj.list.author
    listAuthor.short_description = 'Author'


class GrocerySharedAdmin(admin.ModelAdmin):
    list_display = ['list', 'shared_by']
    list_filter = ['shared_by', 'shared_to']
    search_fields = ['shared_by__username', 'shared_to__username']
    exclude = ['shared_by']
    ordering = ['list']


class GroceryRecipeAdmin(admin.ModelAdmin):
    list_display = ['list', 'recipe', 'listAuthor']
    list_filter = ['list', 'recipe', 'list__author']

    def listAuthor(self, obj):
        return obj.list.author

    listAuthor.short_description = 'Author'

admin.site.register(GroceryList, GroceryListAdmin)
admin.site.register(GroceryShared, GrocerySharedAdmin)
admin.site.register(GroceryItem, GroceryItemAdmin)
admin.site.register(GroceryRecipe, GroceryRecipeAdmin)
