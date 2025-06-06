# Generated by Django 5.2 on 2025-04-20 23:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_customuser_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_image',
            field=models.ImageField(blank=True, help_text="User's profile image", null=True, upload_to='profile_images/'),
        ),
    ]
