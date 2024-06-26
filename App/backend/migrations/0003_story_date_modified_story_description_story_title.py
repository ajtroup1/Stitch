# Generated by Django 5.0.6 on 2024-05-18 09:31

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_fragment_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='story',
            name='date_modified',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='story',
            name='description',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='story',
            name='title',
            field=models.CharField(default='', max_length=50),
        ),
    ]
