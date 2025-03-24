# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2021-09-17 16:33
from uuid import uuid4

import morango.models.fields.uuids
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("device", "0014_syncqueue_instance_id"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="syncqueue",
            name="user",
        ),
        migrations.AddField(
            model_name="syncqueue",
            name="user_id",
            field=morango.models.fields.uuids.UUIDField(default=uuid4),
            preserve_default=False,
        ),
    ]
