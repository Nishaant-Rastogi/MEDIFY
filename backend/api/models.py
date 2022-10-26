from django.db import models
import string
import random

def generate_user_id(size=10, chars=string.ascii_uppercase + string.digits):
    return 'U'+''.join(random.choice(chars) for _ in range(size))

def generate_org_id(size=10, chars=string.ascii_uppercase + string.digits):
    return 'O'+''.join(random.choice(chars) for _ in range(size))


class phoneModel(models.Model):
    Mobile = models.IntegerField(blank=False)
    isVerified = models.BooleanField(blank=False, default=False)
    counter = models.IntegerField(default=0, blank=False)
    def __str__(self):
            return str(self.Mobile)
            
# Create your models here.
class User(models.Model):
    id = models.CharField(max_length=10, primary_key=True, default=generate_user_id)
    name = models.CharField(max_length=200)
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    address = models.CharField(max_length=200)
    phoneNo = models.CharField(max_length=10)
    aadharNo = models.CharField(max_length=12)
    userType = models.CharField(max_length=10)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    balance = models.IntegerField(default=100000)
    def __str__(self):
        return self.name

class Organization(models.Model):
    id = models.CharField(max_length=10, primary_key=True, default=generate_org_id)
    name = models.CharField(max_length=200)
    licenseNo = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phoneNo = models.CharField(max_length=10)
    orgType = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    balance = models.IntegerField(default=1000000)
    def __str__(self):
        return self.name