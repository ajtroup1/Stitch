# Generated by Django 5.0.6 on 2024-05-18 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_story_private'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='pic_url',
            field=models.CharField(default='', max_length=250),
        ),
    ]
