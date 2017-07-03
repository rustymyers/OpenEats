#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import permissions, viewsets
from rest_framework import filters

from .models import Ingredient
from .serializers import IngredientSerializer
from v1.common.permissions import IsOwnerOrReadOnly


class IngredientViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions for Ingredients.
    """
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('recipe',)
