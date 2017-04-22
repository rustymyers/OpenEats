#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from rest_framework import serializers
from django.contrib.auth.models import User

from v1.recipe.models import Recipe, Direction
from v1.recipe_groups.models import Tag
from v1.ingredient.serializers import IngredientSerializer
from v1.recipe_groups.serializers import TagSerializer
from v1.ingredient.models import Ingredient
from django.conf import settings
from v1.recipe.mixins import FieldLimiter

class DirectionSerializer(serializers.ModelSerializer):
    """ Standard `rest_framework` ModelSerializer """
    class Meta:
        model = Direction
        fields = '__all__'


class MiniBrowseSerializer(serializers.ModelSerializer):
    """ Used to get random recipes and limit the return data. """
    photo_thumbnail = serializers.ImageField(required=False)

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
    photo = serializers.ImageField(required=False)
    photo_thumbnail = serializers.ImageField(required=False)
    ingredients = IngredientSerializer(many=True)
    directions = DirectionSerializer(many=True)
    tags = TagSerializer(many=True, required=False)
    username = serializers.ReadOnlyField(source='author.username')

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

        if 'rating' in validated_data:
            rating = int(validated_data.get('rating', 0))
            if rating < 0:
                rating = 0
            elif rating > 5:
                rating = 5
            validated_data['rating'] = rating

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Create the Ingredients
        if ingredient_data:
            for ingredient in instance.ingredients.all():
                ingredient.delete()

            for ingredient in ingredient_data:
                Ingredient.objects.create(recipe=instance, **ingredient)

        # Create the Directions
        if direction_data:
            for direction in instance.directions.all():
                direction.delete()

            for direction in direction_data:
                Direction.objects.create(recipe=instance, **direction)

        # Create the Tags
        if tag_data:
            for tag in instance.tags.all():
                instance.tags.remove(tag)

            for tag in tag_data:
                obj, created = Tag.objects.get_or_create(title=tag['title'].strip())
                instance.tags.add(obj)

        instance.save()
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

        if 'rating' in validated_data:
            rating = int(validated_data.get('rating', 0))
            if rating < 0:
                rating = 0
            elif rating > 5:
                rating = 5
            validated_data['rating'] = rating

        # Create the recipe.
        # Use the log-in user as the author.
        recipe = Recipe.objects.create(
            author=self.context['request'].user,
            **validated_data
        )

        # Create the Ingredients
        for ingredient in ingredient_data:
            Ingredient.objects.create(recipe=recipe, **ingredient)

        # Create the Directions
        for direction in direction_data:
            Direction.objects.create(recipe=recipe, **direction)

        # Create the Tags
        if tag_data:
            for tag in tag_data:
                obj, created = Tag.objects.get_or_create(title=tag['title'].strip())
                recipe.tags.add(obj)

        return recipe

class RatingSerializer(serializers.ModelSerializer):
    """ Standard `rest_framework` ModelSerializer """
    total = serializers.IntegerField(read_only=True)

    class Meta:
        model = Recipe
        fields = ('rating', 'total')