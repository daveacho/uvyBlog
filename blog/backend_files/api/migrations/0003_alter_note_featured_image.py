# Generated by Django 5.1.3 on 2024-12-04 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_note'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='featured_image',
            field=models.FileField(blank=True, default='/media/user_folder/img2.png', null=True, upload_to='blog_img'),
        ),
    ]
