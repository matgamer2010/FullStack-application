# Generated by Django 5.1.4 on 2025-02-14 00:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_storeusersimages_photo_url'),
    ]

    operations = [
        migrations.RenameField(
            model_name='storeusersimages',
            old_name='photo_url',
            new_name='profile_picture',
        ),
    ]
