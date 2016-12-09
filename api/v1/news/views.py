#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import renderers, viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from .models import News
from .serializers import NewsSerializer
from api.v1.common.permissions import IsAdminOrReadOnly


class NewsViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions for THe homepage News items.
    """
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = (IsAdminOrReadOnly,)

    @detail_route(renderer_classes=[renderers.StaticHTMLRenderer])
    def title(self, request, *args, **kwargs):
        entry = self.get_object()
        return Response(entry.content)
