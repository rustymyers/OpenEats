#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.conf.urls import include, url

urlpatterns = [
    url(r'^v1/', include('api.v1.urls', namespace='v1')),
]
