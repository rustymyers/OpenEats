#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from .models import Cuisine, Course, Tag
from .serializers import CuisineSerializer, \
                        CourseSerializer, \
                        TagSerializer
from rest_framework import permissions
from rest_framework import viewsets
from api.v1.common.permissions import IsOwnerOrReadOnly


class CuisineViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Uses `title` as the PK for any lookups.
    """
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    lookup_field = 'title'


class CourseViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Uses `title` as the PK for any lookups.
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    lookup_field = 'title'


class TagViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Uses `title` as the PK for any lookups.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    lookup_field = 'title'
