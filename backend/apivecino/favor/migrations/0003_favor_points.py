# Generated by Django 5.2 on 2025-04-09 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('favor', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='favor',
            name='points',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
