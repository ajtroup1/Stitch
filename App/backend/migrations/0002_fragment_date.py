# Generated by Django 5.0.6 on 2024-05-18 09:25

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='fragment',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]