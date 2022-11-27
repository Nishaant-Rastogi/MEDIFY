# Generated by Django 4.1.2 on 2022-11-27 08:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="log",
            old_name="hash",
            new_name="last_record_hash",
        ),
        migrations.RemoveField(
            model_name="log",
            name="previous_hash",
        ),
        migrations.AddField(
            model_name="consultation",
            name="timestamp",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="consultationbill",
            name="timestamp",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="insurancebill",
            name="timestamp",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="pharmacybill",
            name="timestamp",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="pharmacyorder",
            name="timestamp",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="prescription",
            name="timestamp",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="testresult",
            name="timestamp",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="testresultbill",
            name="timestamp",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name="log",
            name="id",
            field=models.CharField(max_length=11, primary_key=True, serialize=False),
        ),
    ]