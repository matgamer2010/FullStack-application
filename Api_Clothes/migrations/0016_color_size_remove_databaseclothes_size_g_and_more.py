# Generated by Django 5.1.4 on 2025-05-17 23:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api_Clothes', '0015_imageclothes'),
    ]

    operations = [
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
                ('hex_code', models.CharField(default='#FFFFFF', max_length=7)),
            ],
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='databaseclothes',
            name='size_G',
        ),
        migrations.RemoveField(
            model_name='databaseclothes',
            name='size_GG',
        ),
        migrations.RemoveField(
            model_name='databaseclothes',
            name='size_M',
        ),
        migrations.RemoveField(
            model_name='databaseclothes',
            name='size_P',
        ),
        migrations.RemoveField(
            model_name='databaseclothes',
            name='size_PP',
        ),
        migrations.AddField(
            model_name='databaseclothes',
            name='colors',
            field=models.ManyToManyField(related_name='clothes', to='Api_Clothes.color'),
        ),
        migrations.AddField(
            model_name='databaseclothes',
            name='sizes',
            field=models.ManyToManyField(related_name='clothes', to='Api_Clothes.size'),
        ),
    ]
