# Generated by Django 5.1.4 on 2025-01-18 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api_Clothes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='databaseclothes',
            name='size_g',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='databaseclothes',
            name='size_gg',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='databaseclothes',
            name='size_m',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='databaseclothes',
            name='size_p',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='databaseclothes',
            name='size_pp',
            field=models.BooleanField(default=False),
        ),
    ]
