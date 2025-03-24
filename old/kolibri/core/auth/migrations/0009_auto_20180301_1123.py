# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-03-01 19:23
import django.db.models.deletion
from django.conf import settings
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [("kolibriauth", "0008_auto_20180222_1244")]

    operations = [
        migrations.AlterField(
            model_name="membership",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="memberships",
                to="kolibriauth.FacilityUser",
            ),
        )
    ]
