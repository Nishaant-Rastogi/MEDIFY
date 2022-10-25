from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer, CreateUserSerializer, CreateOrganizationSerializer
from .models import User, Organization
from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
import urllib

client = MongoClient("mongodb+srv://fcs_admin:"+urllib.parse.quote("blackthureja@1234")+"@fcs-project.6ejl1sd.mongodb.net/test")
db = client['db_name']

# Create your views here.
class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer  

class CreateUserView(APIView):
    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            dob = serializer.data.get('dob')
            gender = serializer.data.get('gender')
            address = serializer.data.get('address')
            phoneNo = serializer.data.get('phoneNo')
            aadharNo = serializer.data.get('aadharNo')
            userType = serializer.data.get('userType')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            print(name, dob, gender, address, phoneNo, aadharNo, userType, email, password)
            
            user = User(name=name, dob=dob, gender=gender, address=address, phoneNo=phoneNo, aadharNo=aadharNo, userType=userType, email=email, password=password)
            user.save()

            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class CreateOrganizationView(APIView):
    serializer_class = CreateOrganizationSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            licenseNo = serializer.data.get('licenseNo')
            address = serializer.data.get('address')
            phoneNo = serializer.data.get('phoneNo')
            orgType = serializer.data.get('orgType')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            print(name, orgType, licenseNo, address, phoneNo, email, password)
            
            organization = Organization(name=name, orgType=orgType, licenseNo=licenseNo, address=address, phoneNo=phoneNo, email=email, password=password)
            organization.save()

            return Response(CreateOrganizationSerializer(organization).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)