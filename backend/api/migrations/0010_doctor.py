# Generated by Django 4.1.2 on 2022-10-27 06:53

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0009_rename_test_result_testresult_bill_amount_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Doctor",
            fields=[
                (
                    "id",
                    models.CharField(
                        default=api.models.generate_user_id,
                        max_length=11,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                ("dob", models.DateField()),
                ("gender", models.CharField(max_length=10)),
                ("address", models.CharField(max_length=200)),
                ("phoneNo", models.CharField(max_length=10)),
                ("aadharNo", models.CharField(max_length=12)),
                ("userType", models.CharField(max_length=10)),
                ("email", models.CharField(max_length=200)),
                ("password", models.CharField(max_length=200)),
                ("balance", models.IntegerField(default=100000)),
                ("specialization", models.CharField(max_length=200)),
                ("experience", models.IntegerField()),
            ],
        ),
    ]