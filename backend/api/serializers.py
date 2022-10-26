from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'
class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'dob', 'gender', 'address', 'phoneNo', 'aadharNo', 'userType', 'email', 'password')

class CreateOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('name', 'orgType', 'licenseNo', 'address', 'phoneNo', 'email', 'password')

class CreateConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ('doctor_id', 'patient_id', 'doctor_name', 'patient_name', 'patient_gender', 'patient_email', 'problem')