# Generated by Django 4.1.2 on 2022-11-27 11:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_rename_hash_log_last_record_hash_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="log",
            name="last_record_hash",
        ),
    ]