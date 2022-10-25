from django.db import models

def generate_user_id():
    return 'U'+str(User.objects.count()+1)

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=200)
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    address = models.CharField(max_length=200)
    phoneNo = models.CharField(max_length=10)
    aadharNo = models.CharField(max_length=12)
    userType = models.CharField(max_length=10)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Organization(models.Model):
    name = models.CharField(max_length=200)
    orgType = models.CharField(max_length=200)
    licenseNo = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phoneNo = models.CharField(max_length=10)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    def __str__(self):
        return self.name