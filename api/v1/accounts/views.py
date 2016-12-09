#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User

from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, pk=None):
        """ Tests if a users is authentication if they supply pk == 'i' """
        if pk == 'i':
            return Response(UserSerializer(request.user, context={'request':request}).data)
        return super(UserViewSet, self).retrieve(request, pk)
