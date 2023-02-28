# Generated by Django 4.1.3 on 2023-01-10 15:31

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0002_alter_users_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employees',
            name='First_Name',
            field=models.CharField(blank=True, max_length=12, validators=[django.core.validators.RegexValidator('[+-/%=]', inverse_match=True)]),
        ),
        migrations.AlterField(
            model_name='employees',
            name='Last_Name',
            field=models.CharField(blank=True, max_length=15, validators=[django.core.validators.RegexValidator('[+-/%=]', inverse_match=True)]),
        ),
        migrations.AlterField(
            model_name='employees',
            name='Skill_Level',
            field=models.CharField(max_length=50, validators=[django.core.validators.RegexValidator('[+-/%=]', inverse_match=True)]),
        ),
        migrations.AlterField(
            model_name='skill_level',
            name='Skill_Name',
            field=models.CharField(max_length=100, validators=[django.core.validators.RegexValidator('[+-/%=]', inverse_match=True)]),
        ),
    ]