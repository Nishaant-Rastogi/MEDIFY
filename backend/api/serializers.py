from rest_framework import serializers
from .models import User, Organization

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'dob', 'gender', 'address', 'phoneNo', 'aadharNo', 'userType', 'email', 'password')

class CreateOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('name', 'orgType', 'licenseNo', 'address', 'phoneNo', 'email', 'password')