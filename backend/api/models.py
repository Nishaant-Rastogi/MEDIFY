from __future__ import unicode_literals
from email.policy import default
from django.db import models
from django.utils import timezone
from django.db.transaction import atomic
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

def generate_order_id(size=10, chars=string.ascii_uppercase + string.digits):
    return 'O'+''.join(random.choice(chars) for _ in range(size))

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
    user_proof = models.ImageField(upload_to='user_proof')
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    balance = models.IntegerField(default=100000)
    verified = models.BooleanField(default=False)
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
    user_proof = models.ImageField(upload_to='user_proof')
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    balance = models.IntegerField(default=100000)
    specialization = models.CharField(max_length=200)
    experience = models.IntegerField()
    doctor_proof = models.ImageField(upload_to='doctor_proof')
    hospital = models.CharField(max_length=11, blank=True)
    verified = models.BooleanField(default=False)
    def __str__(self):
        return self.name
class Organization(models.Model):
    id = models.CharField(max_length=11, primary_key=True, default=generate_org_id)
    name = models.CharField(max_length=200)
    licenseNo = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phoneNo = models.CharField(max_length=10)
    orgType = models.CharField(max_length=200)
    license_proof = models.ImageField(upload_to='license_proof')
    org_images = models.ImageField(upload_to='org_images')
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    balance = models.IntegerField(default=1000000)
    verified = models.BooleanField(default=False)
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
    amount = models.IntegerField(default=100)
    visible = models.BooleanField(default=True)
    prescribed = models.BooleanField(default=False)
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
    medicine_bought = models.BooleanField(default=False)
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
    amount = models.IntegerField(default=100)
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
    amount = models.IntegerField(default=100)
    insurance_id = models.CharField(max_length=11, default='None')
    insurance_name = models.CharField(max_length=200, default='None')
    docType = models.CharField(default='BP', max_length=1)
    visible = models.BooleanField(default=True)
    claimed = models.BooleanField(default=False)
    def __str__(self):
        return self.consultation_id

class InsuranceBill(models.Model):
    id = models.CharField(max_length=11, primary_key=True, default=generate_bill_id)
    bill_id = models.CharField(max_length=11)
    patient_id = models.CharField(max_length=11)
    # test = models.CharField(max_length=20, default='None')
    refund = models.IntegerField(default=10)
    insurance_id = models.CharField(max_length=11, default='None')
    docType = models.CharField(default='BI', max_length=1)
    visible = models.BooleanField(default=True)
    claimed = models.BooleanField(default=False)
    def __str__(self):
        return self.consultation_id

class PharmacyOrder(models.Model):
    id = models.CharField(max_length=11, primary_key=True, default=generate_order_id)
    prescription_id = models.CharField(max_length=11)
    patient_id = models.CharField(max_length=11)
    patient_name = models.CharField(max_length=200)
    pharmacy_id = models.CharField(max_length=11)
    pharmacy_name = models.CharField(max_length=200)
    medicine = models.CharField(max_length=20, default='None')
    amount = models.IntegerField(default=100)
    docType = models.CharField(default='O', max_length=1)
    visible = models.BooleanField(default=True)
    delivered = models.BooleanField(default="Pending")
    def __str__(self):
        return self.consultation_id

class Log(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    document = models.CharField(max_length=64, default='None')
    blockChainID = models.CharField(max_length=64, default='None')
    contract_address = models.CharField(max_length=64, default='None')
    hash = models.CharField(max_length=64, default='None')
    previous_hash = models.CharField(max_length=64, default='None')
    def __str__(self):
        return self.consultation_id