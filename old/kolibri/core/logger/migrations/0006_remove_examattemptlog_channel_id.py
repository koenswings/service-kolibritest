# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2019-01-17 20:43
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [("logger", "0005_auto_20180514_1419")]

    operations = [
        migrations.RemoveField(model_name="examattemptlog", name="channel_id")
    ]
