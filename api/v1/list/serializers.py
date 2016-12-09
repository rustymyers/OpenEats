#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from django.forms import ModelForm, forms
from django.forms.widgets import HiddenInput
from django.http import HttpResponse
from django.utils.translation import ugettext_lazy as _
from django.core.mail import EmailMessage, BadHeaderError
from django.conf import settings
from django.template import loader, RequestContext
from django.contrib.sites.models import Site
from django.db.models import Q

from rest_framework import serializers
from .models import GroceryList, GroceryShared, GroceryAisle, GroceryItem, GroceryRecipe


class GroceryItemSerializer(serializers.ModelSerializer):
    """used to create a new grocery list for a user"""
    class Meta:
        model = GroceryItem
        exclude = ('slug',)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)  # get the user passed to the form off of the keyword argument
        super(GroceryItemSerializer, self).__init__(*args, **kwargs)

    def add_fields(self, form, index):
        super(GroceryItemSerializer, self).add_fields(form, index)
        form.fields["aisle"] = forms.ModelChoiceField(queryset=GroceryAisle.objects.filter(Q(author__isnull=True) | Q( author=self.user)), required=False)

    def clean(self):
        """Require at least one form in the formset to be completed."""
        super(GroceryItemSerializer, self).clean()
        for error in self.errors:
            if error:
                return
        completed = 0
        for cleaned_data in self.cleaned_data:
            if cleaned_data and not cleaned_data.get('DELETE', False):
                completed += 1
        if completed < 1:
            raise forms.ValidationError("At least one %s is required." %
                                        self.model._meta.object_name.lower())


class GroceryListSerializer(serializers.ModelSerializer):
    """used to create a new grocery list for a user"""
    class Meta:
        model = GroceryList
        exclude = ('slug',)


class GrocerySharedSerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new course"""
    class Meta:
        model = GroceryShared
        fields = ('shared_to',)


class GroceryAisleSerializer(serializers.ModelSerializer):
    """form object for the popup from the recipe_form to add a new course"""
    class Meta:
        model = GroceryAisle
        fields = "__all__"
        widgets = {'author': HiddenInput()}

    def clean(self):
        """make sure the user is not trying to add the same aisle twice"""
        cleaned_data = self.cleaned_data
        try:
            GroceryAisle.objects.get(aisle=cleaned_data['aisle'], author=cleaned_data['author'])
        except:
            pass
        else:
            raise forms.ValidationError(_('Aisle with this name already exists for your account'))
        return cleaned_data


class GroceryRecipeSerializer(ModelForm):
    """grocery form to allow you to select a user from your friends to share a list with"""
    class Meta:
        model = GroceryRecipe
        fields = "__all__"


# This class isnt using any rest framework elements
# I should change this later
'''
class GrocerySendMail(forms.Form):
    """Grocery form to send a grocery list to someone in email"""
    def __init__(self, data=None, files=None, request=None, *args, **kwargs):
        if request is None:
            raise TypeError("Keyword argument 'request must be supplies'")
        super(GrocerySendMail, self).__init__(data=data, files=files, *args, **kwargs)
        self.request = request

        # set up the return email address and sender name to the user logged in
        if request.user.is_authenticated():
            self.fields['to_email'].initial= request.user.email

    to_email = forms.EmailField(widget=forms.TextInput(), label=_('email address'))
    gid = forms.CharField(widget=forms.HiddenInput())

    from_email = settings.DEFAULT_FROM_EMAIL
    from_site = Site.objects.get_current()
    subject = _('Grocery list from ' + str(from_site))

    def get_body(self):
        """get the grocery list and return the message body for the email"""
        if self.is_valid():
            list = GroceryList.objects.get(pk = self.cleaned_data['gid'])
            template_name = 'list/grocery_mail_body.html'  # template that contains the email body and also shared by the grocery print view
            message = loader.render_to_string(template_name, {'list': list}, context_instance=RequestContext(self.request))
            return message
        else:
            raise ValueError(_('Can not get grocery list id from invalid form data'))

    def get_toMail(self):
        """gets the email to send the list to from the form"""
        if self.is_valid():
            return self.cleaned_data['to_email']
        else:
            raise ValueError(_('Can not get to_email from invalid form data'))

    def save(self, fail_silently=False):
        """ sends the email message"""
        if self.subject and self.get_body() and self.from_email:
            try:
                msg = EmailMessage(self.subject, self.get_body(), self.from_email, [self.get_toMail()])
                msg.content_subtype = 'html'
                msg.send()
            except BadHeaderError:
                return HttpResponse(_('Invalid header found.'))
            return HttpResponse(_('Email Sent'))
        else:
            return HttpResponse('Make sure all fields are entered and valid.')
'''
