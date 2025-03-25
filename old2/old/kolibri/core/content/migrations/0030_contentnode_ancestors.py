# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2021-10-11 20:51
from django.db import migrations

import kolibri.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0029_metadata_bitmasks"),
    ]

    operations = [
        migrations.AddField(
            model_name="contentnode",
            name="ancestors",
            field=kolibri.core.fields.JSONField(blank=True, default=[], null=True),
        ),
    ]
