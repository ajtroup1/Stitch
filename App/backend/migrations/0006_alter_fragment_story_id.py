# Generated by Django 5.0.6 on 2024-05-18 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_alter_fragment_story_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fragment',
            name='story_id',
            field=models.IntegerField(null=True),
        ),
    ]