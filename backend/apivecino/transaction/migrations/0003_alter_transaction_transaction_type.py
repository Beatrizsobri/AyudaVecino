# Generated by Django 5.2 on 2025-04-24 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='transaction_type',
            field=models.CharField(choices=[('SPEND', 'Spend'), ('EARN', 'Earn'), ('RETURN', 'Return')], max_length=6),
        ),
    ]
