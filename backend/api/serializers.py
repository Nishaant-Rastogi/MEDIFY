from rest_framework import serializers
from .models import *

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'password')
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'
class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'
class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'
class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'
class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = '__all__'

class ConsultationBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationBill
        fields = '__all__'

class TestResultBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResultBill
        fields = '__all__'

class PharmacyBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = PharmacyBill
        fields = '__all__'
class InsuranceBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsuranceBill
        fields = '__all__'
        
class PharmacyOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PharmacyOrder
        fields = '__all__'

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'dob', 'gender', 'address', 'phoneNo', 'aadharNo', 'userType', 'email')

class CreateOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('name', 'orgType', 'licenseNo', 'address', 'phoneNo', 'email')

class CreateConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ('doctor_id', 'patient_id', 'doctor_name', 'patient_name', 'patient_gender', 'patient_email', 'problem')

class CreatePrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ('consultation_id', 'doctor_id', 'patient_id', 'doctor_name', 'patient_name', 'medicine', 'test')

class CreateTestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = ('prescription_id', 'hospital_id', 'hospital_name', 'patient_id', 'patient_name', 'test', 'test_result')

class CreateConsultationBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationBill
        fields = ('consultation_id', 'patient_id', 'patient_name', 'amount', 'doctor_id', 'doctor_name','insurance_id', 'insurance_name')

class CreateTestResultBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResultBill
        fields = ('prescription_id', 'patient_id', 'patient_name', 'amount', 'hospital_id', 'hospital_name', 'insurance_id', 'insurance_name', 'test')

class CreatePharmacyBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = PharmacyBill
        fields = ('prescription_id', 'patient_id', 'patient_name', 'amount', 'pharmacy_id', 'pharmacy_name', 'insurance_id', 'insurance_name', 'medicine')

class CreatePharmacyOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PharmacyOrder
        fields = ('prescription_id', 'patient_id', 'patient_name', 'amount', 'medicine', 'pharmacy_id', 'pharmacy_name')