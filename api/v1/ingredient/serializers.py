#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import serializers

from .models import Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    """ Standard `rest_framework` ModelSerializer """
    class Meta:
        model = Ingredient
        fields = '__all__'
