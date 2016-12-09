#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.db import models
from django.utils.translation import ugettext_lazy as _
from measurement.measures import Volume

from api.v1.recipe.models import Recipe
from .utils import mass_to_volume_lookup


class Ingredient(models.Model):
    """
    Django Model to hold an Ingredient.
    Ingredients share a many to one relationship.
    Meaning each Recipe will have many Ingredients.
    :title: = Title of the Ingredient (EX: Flour)
    :quantity: = Title of the Ingredient (EX: 200, 15, 2)
    :measurement: = Title of the Ingredient (EX: Liters, Cups, Grams, tablespoons)
    """
    title = models.CharField(_('title'), max_length=250)
    quantity = models.FloatField(_('quantity'), default=0)
    measurement = models.CharField(_('measurement'), max_length=200, blank=True, null=True)
    recipe = models.ForeignKey(Recipe, verbose_name=_('recipe'), related_name='ingredients', null=True)
 
    class Meta:
        ordering = ['title']

    def __unicode__(self):
        return self.title

    def mass_to_volume(self, mass):
        # TODO: Be able to convert from Metric to Imperial (America's Crazy system)
        amount = float(mass_to_volume_lookup(mass, 'us_cup'))
        #self.quantity = Volume(us_cup=amount)
        #self.save()
