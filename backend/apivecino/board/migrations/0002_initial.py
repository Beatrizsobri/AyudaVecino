# Generated by Django 5.1.7 on 2025-03-26 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('board', '0001_initial'),
        ('favor', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='favors',
            field=models.ManyToManyField(related_name='boards', to='favor.favor', verbose_name='Favors'),
        ),
    ]
