# Generated by Django 4.1.2 on 2022-11-28 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_log_tampered"),
    ]

    operations = [
        migrations.AddField(
            model_name="log",
            name="action",
            field=models.CharField(default="None", max_length=64),
        ),
    ]