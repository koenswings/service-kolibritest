# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2019-01-25 00:39
from django.db import migrations

from kolibri.core.content.utils.annotation import calculate_next_order


def calculate_channel_order(apps, schema_editor):
    ChannelMetadata = apps.get_model("content", "ChannelMetadata")
    for channel in ChannelMetadata.objects.all():
        calculate_next_order(channel, ChannelMetadata)


class Migration(migrations.Migration):

    dependencies = [("content", "0015_auto_20190125_1715")]

    operations = [
        migrations.RunPython(calculate_channel_order, migrations.RunPython.noop)
    ]
