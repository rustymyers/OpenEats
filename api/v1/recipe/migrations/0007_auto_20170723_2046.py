# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-07-24 01:46
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0006_auto_20170127_0905'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='recipe',
            options={'ordering': ['-pub_date', 'title']},
        ),
    ]
