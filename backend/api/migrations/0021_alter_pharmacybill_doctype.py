# Generated by Django 4.1.2 on 2022-10-28 06:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0020_alter_consultation_amount_alter_pharmacybill_amount_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pharmacybill",
            name="docType",
            field=models.CharField(default="BP", max_length=1),
        ),
    ]
