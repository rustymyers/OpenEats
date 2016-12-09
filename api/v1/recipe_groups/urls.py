#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from api.v1.recipe_groups import views

# Create a router and register our viewsets with it.
router = DefaultRouter(schema_title='recipe_groups')
router.register(r'cuisine', views.CuisineViewSet)
router.register(r'course', views.CourseViewSet)
router.register(r'tag', views.TagViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
