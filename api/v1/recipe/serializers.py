#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Recipe, Tag, Direction
from api.v1.ingredient.serializers import IngredientSerializer
from api.v1.recipe_groups.serializers import TagSerializer
from api.v1.ingredient.models import Ingredient
from django.conf import settings
from .mixins import FieldLimiter


class MyImageField(serializers.ImageField):
    def to_representation(self, value):
        if not bool(value):
            return settings.MEDIA_URL + 'default_thumbnail.png'
        return super(MyImageField, self).to_representation(value)


class DirectionSerializer(serializers.ModelSerializer):
    """ Standard `rest_framework` ModelSerializer """
    class Meta:
        model = Direction
        fields = '__all__'


class MiniBrowseSerializer(serializers.ModelSerializer):
    """ Used to get random recipes and limit the return data. """
    photo_thumbnail = MyImageField(required=False)

    class Meta:
        model = Recipe
        fields = (
            'id',
            'title',
            'pub_date',
            'rating',
            'photo_thumbnail',
            'info'
        )


class RecipeSerializer(FieldLimiter, serializers.ModelSerializer):
    """ Used to create new recipes"""
    photo = MyImageField(required=False)
    photo_thumbnail = MyImageField(required=False)
    ingredients = IngredientSerializer(many=True)
    directions = DirectionSerializer(many=True)
    tags = TagSerializer(many=True)

    class Meta:
        model = Recipe
        exclude = ('slug',)

    def update(self, instance, validated_data):
        """
        Update and return a new `Recipe` instance, given the validated data.
        This will also update or create all the ingredient, direction,
        or tag objects required.
        """
        # Pop tags, directions, and ingredients
        ingredient_data = validated_data.pop('ingredients', None)
        direction_data = validated_data.pop('directions', None)
        tag_data = validated_data.pop('tags', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # # Create the Ingredients
        # ingredient_instance = Ingredient.objects.get_or_create(recipe=recipe)
        # for ingredient in ingredient_data:
        #     for attr, value in ingredient:
        #         setattr(ingredient_instance, attr, value)
        #     ingredient_instance.save()
        #
        # # Create the Directions
        # direction_instance = Ingredient.objects.get_or_create(recipe=recipe)
        # for direction in direction_data:
        #     for attr, value in direction:
        #         setattr(direction_instance, attr, value)
        #     direction_instance.save()

        # # Create the Tags
        # for tag in tag_data:
        #     author = User.objects.get(pk=1)
        #     obj, created = Tag.objects.get_or_create(title=tag['title'].strip(), defaults={'author': author})
        #     recipe.tags.add(obj)

        return instance

    def create(self, validated_data):
        """
        Create and return a new `Recipe` instance, given the validated data.
        This will also create all the ingredient objects required and
        Create all Tags that are new.
        """
        # Pop tags, directions, and ingredients
        ingredient_data = validated_data.pop('ingredients', None)
        direction_data = validated_data.pop('directions', None)
        tag_data = validated_data.pop('tags', None)

        # Create the recipe
        recipe = Recipe.objects.create(**validated_data)

        # Create the Ingredients
        for ingredient in ingredient_data:
            Ingredient.objects.create(recipe=recipe, **ingredient)

        # Create the Directions
        for direction in direction_data:
            Direction.objects.create(recipe=recipe, **direction)

        # Create the Tags
        for tag in tag_data:
            obj, created = Tag.objects.get_or_create(title=tag['title'].strip())
            recipe.tags.add(obj)

        return recipe
