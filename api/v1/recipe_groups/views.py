#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.db.models import Count
from v1.recipe_groups.models import Cuisine, Course, Tag
from v1.recipe_groups import serializers
from rest_framework import permissions
from rest_framework import viewsets
from v1.common.permissions import IsOwnerOrReadOnly


class CuisineViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Uses `title` as the PK for any lookups.
    """
    serializer_class = serializers.CuisineSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    lookup_field = 'slug'

    def get_queryset(self):
        query = Cuisine.objects

        filter = {}
        if 'course' in self.request.query_params:
            try:
                filter['recipe__course'] = Course.objects.get(slug=self.request.query_params.get('course'))
            except:
                return []

        if 'rating' in self.request.query_params:
            filter['recipe__rating'] = self.request.query_params.get('rating')

        return query.filter(**filter).annotate(total=Count('recipe', distinct=True))


class CourseViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Uses `title` as the PK for any lookups.
    """
    serializer_class = serializers.CourseSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    lookup_field = 'slug'

    def get_queryset(self):
        query = Course.objects

        filter = {}
        if 'cuisine' in self.request.query_params:
            try:
                filter['recipe__cuisine'] = Cuisine.objects.get(slug=self.request.query_params.get('cuisine'))
            except:
                return []

        if 'rating' in self.request.query_params:
            filter['recipe__rating'] = self.request.query_params.get('rating')

        return query.filter(**filter).annotate(total=Count('recipe', distinct=True))


class TagViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Uses `title` as the PK for any lookups.
    """
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    lookup_field = 'title'
