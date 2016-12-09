#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.conf.urls import include, url

urlpatterns = [
    url(r'^accounts/', include('api.v1.accounts.urls')),
    url(r'^recipe_groups/', include('api.v1.recipe_groups.urls')),
    url(r'^ingredient/', include('api.v1.ingredient.urls')),
    url(r'^list/', include('api.v1.list.urls')),
    url(r'^news/', include('api.v1.news.urls')),
    url(r'^recipe/', include('api.v1.recipe.urls')),
]
