# Generated by Django 4.1.3 on 2023-01-16 13:49

import django.core.validators
from django.db import migrations, models
import django_cryptography.fields


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0006_alter_users_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='Password',
            field=django_cryptography.fields.encrypt(models.CharField(max_length=15, validators=[django.core.validators.RegexValidator('[+-/%=]', inverse_match=True)])),
        ),
    ]