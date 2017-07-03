#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView

admin.autodiscover()

urlpatterns = [
    # Backend
    url(r'^api/v1/', include('v1.urls', namespace='v1')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # Generic Static Home
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='home'),

    # Admin
    url(r'^admin/', admin.site.urls),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
