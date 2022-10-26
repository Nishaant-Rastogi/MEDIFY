from ast import Or
from tabnanny import check
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer, CreateUserSerializer, CreateOrganizationSerializer, OrganizationSerializer
from .models import User, Organization
from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
import urllib

client = MongoClient("mongodb+srv://fcs_admin:"+urllib.parse.quote("blackthureja@1234")+"@fcs-project.6ejl1sd.mongodb.net/test")
db = client['FCS_Project']

check_user_collection = db['admin_users']
check_org_collection = db['admin_organization']
user_collection = db['Users']
org_collection = db['Organizations']
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
            
            user = User(name=name, dob=dob, gender=gender, address=address, phoneNo=phoneNo, aadharNo=aadharNo, userType=userType, email=email, password=password)
            user.save()
            print(UserSerializer(user).data)
            check_user_collection.insert_one(UserSerializer(user).data)
            return Response(CreateUserSerializer(user).data, status=status.HTTP_201_CREATED)
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
            
            organization = Organization(name=name, orgType=orgType, licenseNo=licenseNo, address=address, phoneNo=phoneNo, email=email, password=password)
            print(OrganizationSerializer(organization).data)
            organization.save()
            check_org_collection.insert_one(OrganizationSerializer(organization).data)
            return Response(CreateOrganizationSerializer(organization).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(APIView):
    serializer_class = UserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            id = serializer.data.get('id')
            password = serializer.data.get('password')
            user = user_collection.find({'id': id, 'password': password})
            if user:
                return Response(UserSerializer(user[0]).data, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid credentials...'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class LoginOrganizationView(APIView):
    serializer_class = OrganizationSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            id = serializer.data.get('id')
            password = serializer.data.get('password')
            print(id, password)
            organization = org_collection.find({'id': id, 'password': password})
            if organization:
                return Response(OrganizationSerializer(organization[0]).data, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class GetCheckUsersView(APIView):
    serializer_class = UserSerializer
    def get(self, request, format=None):
        users = check_user_collection.find({})
        return Response(UserSerializer(users, many=True).data, status=status.HTTP_200_OK)

class GetCheckOrganizationsView(APIView):
    serializer_class = OrganizationSerializer
    def get(self, request, format=None):
        orgs = check_org_collection.find({})
        return Response(OrganizationSerializer(orgs, many=True).data, status=status.HTTP_200_OK)

class GetUsersView(APIView):
    serializer_class = UserSerializer
    def get(self, request, format=None):
        users = user_collection.find({})
        return Response(UserSerializer(users, many=True).data, status=status.HTTP_200_OK)

class GetOrganizationsView(APIView):
    serializer_class = OrganizationSerializer
    def get(self, request, format=None):
        orgs = org_collection.find({})
        return Response(OrganizationSerializer(orgs, many=True).data, status=status.HTTP_200_OK)

class ApproveUserView(APIView):
    serializer_class = UserSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user_collection.insert_one(serializer.data)
            return Response(UserSerializer(serializer).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class ApproveOrganizationView(APIView):
    serializer_class = OrganizationSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            org_collection.insert_one(serializer.data)
            return Response(OrganizationSerializer(serializer).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class RejectUserView(APIView):
    serializer_class = UserSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            check_user_collection.delete_one(serializer.data)
            return Response(UserSerializer(serializer).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class RejectOrganizationView(APIView):
    serializer_class = OrganizationSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            check_org_collection.delete_one(serializer.data)
            return Response(OrganizationSerializer(serializer).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)