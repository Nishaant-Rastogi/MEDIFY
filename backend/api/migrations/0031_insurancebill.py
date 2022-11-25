# Generated by Django 4.1.2 on 2022-11-19 17:20

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0030_doctor_verified_organization_verified_user_verified"),
    ]

    operations = [
        migrations.CreateModel(
            name="InsuranceBill",
            fields=[
                (
                    "id",
                    models.CharField(
                        default=api.models.generate_bill_id,
                        max_length=11,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("bill_id", models.CharField(max_length=11)),
                ("patient_id", models.CharField(max_length=11)),
                ("refund", models.IntegerField(default=10)),
                ("insurance_id", models.CharField(default="None", max_length=11)),
                ("docType", models.CharField(default="BI", max_length=1)),
                ("visible", models.BooleanField(default=True)),
                ("claimed", models.BooleanField(default=False)),
            ],
        ),
    ]