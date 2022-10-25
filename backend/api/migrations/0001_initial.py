# Generated by Django 4.1.2 on 2022-10-25 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
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
            ],
        ),
    ]