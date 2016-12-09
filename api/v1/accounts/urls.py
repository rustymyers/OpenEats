#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [url(r'^obtain-auth-token/$', obtain_auth_token)]
