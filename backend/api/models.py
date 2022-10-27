from email.policy import default
from django.db import models
import string
import random

def generate_user_id(size=10, chars=string.ascii_uppercase + string.digits):
    return 'U'+''.join(random.choice(chars) for _ in range(size))

def generate_org_id(size=10, chars=string.ascii_uppercase + string.digits):
    return 'O'+''.join(random.choice(chars) for _ in range(size))

def generate_consultation_id(size=10, chars=string.ascii_uppercase + string.digits):
    return 'C'+''.join(random.choice(chars) for _ in range(size))

def generate_prescription_id(size=10, chars=string.ascii_uppercase + string.digits):
    return 'P'+''.join(random.choice(chars) for _ in range(size))

def generate_test_result_id(size=10, chars=string.ascii_uppercase + string.digits):
    return 'T'+''.join(random.choice(chars) for _ in range(size))

def generate_bill_id(size=10, chars=string.ascii_uppercase + string.digits):
    return 'B'+''.join(random.choice(chars) for _ in range(size))

class phoneModel(models.Model):
    Mobile = models.IntegerField(blank=False)
    isVerified = models.BooleanField(blank=False, default=False)
    counter = models.IntegerField(default=0, blank=False)
    def __str__(self):
            return str(self.Mobile)
            
# Create your models here.
class User(models.Model):
    id = models.CharField(max_length=11, primary_key=True, default=generate_user_id)
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
class Doctor(models.Model):
    id = models.CharField(max_length=11, primary_key=True, default=generate_user_id)
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
    specialization = models.CharField(max_length=200)
    experience = models.IntegerField()
    def __str__(self):
        return self.name
class Organization(models.Model):
    id = models.CharField(max_length=11, primary_key=True, default=generate_org_id)
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

class Consultation(models.Model):
    id = models.CharField(max_length=11, primary_key=True, default=generate_consultation_id)
    doctor_id = models.CharField(max_length=11)
    patient_id = models.CharField(max_length=11)
    doctor_name = models.CharField(max_length=200)
    patient_name = models.CharField(max_length=200)
    patient_gender = models.CharField(max_length=10)
    patient_email = models.CharField(max_length=200)
    problem = models.CharField(max_length=200)
    docType = models.CharField(default='C', max_length=1)
    amount = models.IntegerField(default=1000)
    visible = models.BooleanField(default=True)
    def __str__(self):
        return self.id

class Prescription(models.Model):
    id = models.CharField(max_length=11, primary_key=True, default=generate_prescription_id)
    consultation_id = models.CharField(max_length=11)
    doctor_id = models.CharField(max_length=11)
    patient_id = models.CharField(max_length=11)
    doctor_name = models.CharField(max_length=200)
    patient_name = models.CharField(max_length=200)
    medicine = models.CharField(max_length=20, default='None')
    dosage = models.CharField(max_length=20, default='None')
    duration = models.CharField(max_length=20, default='None')
    test = models.CharField(max_length=20, default='None')
    docType = models.CharField(default='P', max_length=1)
    visible = models.BooleanField(default=True)
    def __str__(self):
        return self.consultation_id

class TestResult(models.Model):
    id = models.CharField(max_length=11, primary_key=True, default=generate_test_result_id)
    prescription_id = models.CharField(max_length=11)
    hospital_id = models.CharField(max_length=11)
    hospital_name = models.CharField(max_length=200)
    patient_id = models.CharField(max_length=11)
    patient_name = models.CharField(max_length=200)
    test = models.CharField(max_length=200)
    test_result = models.CharField(max_length=200)
    docType = models.CharField(default='T', max_length=1)
    visible = models.BooleanField(default=True)
    def __str__(self):
        return self.consultation_id

class ConsultationBill(models.Model):
    id = models.CharField(max_length=11, primary_key=True, default=generate_bill_id)
    consultation_id = models.CharField(max_length=11)
    # pharmacy_id = models.CharField(max_length=11)
    # pharmacy_name = models.CharField(max_length=200)
    patient_id = models.CharField(max_length=11)
    patient_name = models.CharField(max_length=200)
    doctor_id = models.CharField(max_length=11)
    doctor_name = models.CharField(max_length=200)
    # medicine = models.CharField(max_length=20, default='None')
    # test = models.CharField(max_length=20, default='None')
    amount = models.IntegerField(default=100)
    insurance_id = models.CharField(max_length=11, default='None')
    insurance_name = models.CharField(max_length=200, default='None')
    docType = models.CharField(default='BC', max_length=1)
    visible = models.BooleanField(default=True)
    claimed = models.BooleanField(default=False)
    prescribed = models.BooleanField(default=False)
    def __str__(self):
        return self.consultation_id

class TestResultBill(models.Model):
    id = models.CharField(max_length=11, primary_key=True, default=generate_bill_id)
    prescription_id = models.CharField(max_length=11)
    patient_id = models.CharField(max_length=11)
    patient_name = models.CharField(max_length=200)
    hospital_id = models.CharField(max_length=11)
    hospital_name = models.CharField(max_length=200)
    # medicine = models.CharField(max_length=20, default='None')
    test = models.CharField(max_length=20, default='None')
    amount = models.IntegerField(default=1000)
    insurance_id = models.CharField(max_length=11, default='None')
    insurance_name = models.CharField(max_length=200, default='None')
    docType = models.CharField(default='BT', max_length=1)
    visible = models.BooleanField(default=True)
    claimed = models.BooleanField(default=False)
    def __str__(self):
        return self.consultation_id

class PharmacyBill(models.Model):
    id = models.CharField(max_length=11, primary_key=True, default=generate_bill_id)
    prescription_id = models.CharField(max_length=11)
    patient_id = models.CharField(max_length=11)
    patient_name = models.CharField(max_length=200)
    pharmacy_id = models.CharField(max_length=11)
    pharmacy_name = models.CharField(max_length=200)
    medicine = models.CharField(max_length=20, default='None')
    # test = models.CharField(max_length=20, default='None')
    amount = models.IntegerField(default=1000)
    insurance_id = models.CharField(max_length=11, default='None')
    insurance_name = models.CharField(max_length=200, default='None')
    docType = models.CharField(default='BP  ', max_length=1)
    visible = models.BooleanField(default=True)
    claimed = models.BooleanField(default=False)
    def __str__(self):
        return self.consultation_id
