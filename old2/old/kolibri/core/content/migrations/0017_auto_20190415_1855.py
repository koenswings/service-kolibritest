# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-04-15 10:55
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [("content", "0016_auto_20190124_1639")]

    operations = [
        migrations.AlterField(
            model_name="channelmetadata",
            name="published_size",
            field=models.BigIntegerField(blank=True, default=0, null=True),
        )
    ]
