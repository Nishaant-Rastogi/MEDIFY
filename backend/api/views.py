from ast import Or
import re
from tabnanny import check
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer, CreateUserSerializer, CreateOrganizationSerializer, OrganizationSerializer
from .models import User, Organization, phoneModel
from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
import urllib
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
import base64
import pyotp

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
        id = request.data['id']
        password = request.data['password']
        user = user_collection.find({'id': id, 'password': password})
        if user:
            return Response(UserSerializer(user[0]).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid credentials...'}, status=status.HTTP_400_BAD_REQUEST)

class LoginOrganizationView(APIView):
    serializer_class = OrganizationSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        print(request.data)
        id = request.data['id']
        password = request.data['password']
        print(id, password)
        organization = org_collection.find({'id': id, 'password': password})
        if organization:
            return Response(OrganizationSerializer(organization[0]).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

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

class GetUserView(APIView):
    serializer_class = UserSerializer
    def post(self, request, format=None):
        id = request.data['id']
        user = user_collection.find({'id': id})
        print(user)
        return Response(UserSerializer(user[0]).data, status=status.HTTP_200_OK)

class UpdateUserView(APIView):
    serializer_class = CreateUserSerializer
    def post(self, request, format=None):
        dob = request.data['dob']
        gender = request.data['gender']
        address = request.data['address']
        phoneNo = request.data['phoneNo']
        balance = request.data['balance']
        id = request.data['id']
        user_collection.update_one({'id': id}, {'$set': {'dob': dob, 'gender': gender, 'address': address, 'phoneNo': phoneNo, 'balance': balance}})
        user = user_collection.find({'id': id})
        print(user)
        return Response(UserSerializer(user[0]).data, status=status.HTTP_200_OK)

class UpdateOrganizationView(APIView):
    serializer_class = CreateOrganizationSerializer
    def post(self, request, format=None):
        address = request.data['address']
        phoneNo = request.data['phoneNo']
        balance = request.data['balance']
        id = request.data['id']
        org_collection.update_one({'id': id}, {'$set': { 'address': address, 'phoneNo': phoneNo, 'balance': balance}})
        org = org_collection.find({'id': id})
        return Response(OrganizationSerializer(org[0]).data, status=status.HTTP_200_OK)

class GetOrganizationView(APIView):
    serializer_class = OrganizationSerializer
    def post(self, request, format=None):
        id = request.data['id']
        org = org_collection.find({'id': id})
        return Response(OrganizationSerializer(org[0]).data, status=status.HTTP_200_OK)

class GetOrganizationsView(APIView):
    serializer_class = OrganizationSerializer
    def get(self, request, format=None):
        orgs = org_collection.find({})
        print(orgs)
        return Response(OrganizationSerializer(orgs, many=True).data, status=status.HTTP_200_OK)

class GetHospitalsView(APIView):
    serializer_class = OrganizationSerializer
    def get(self, request, format=None):
        orgs = org_collection.find({'orgType': 'H'})
        return Response(OrganizationSerializer(orgs, many=True).data, status=status.HTTP_200_OK)

class GetDoctorsView(APIView):
    serializer_class = UserSerializer
    def get(self, request, format=None):
        users = user_collection.find({'userType': 'D'})
        return Response(UserSerializer(users, many=True).data, status=status.HTTP_200_OK)

class GetPatientsView(APIView):
    serializer_class = UserSerializer
    def get(self, request, format=None):
        users = user_collection.find({'userType': 'P'})
        return Response(UserSerializer(users, many=True).data, status=status.HTTP_200_OK)

class GetPharmaciesView(APIView):
    serializer_class = OrganizationSerializer
    def get(self, request, format=None):
        orgs = org_collection.find({'orgType': 'P'})
        return Response(OrganizationSerializer(orgs, many=True).data, status=status.HTTP_200_OK)

class GetInsuranceView(APIView):
    serializer_class = OrganizationSerializer
    def get(self, request, format=None):
        orgs = org_collection.find({'orgType': 'I'})
        return Response(OrganizationSerializer(orgs, many=True).data, status=status.HTTP_200_OK)

class ApproveUserView(APIView):
    serializer_class = CreateUserSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = User(id=request.data['id'], name=request.data['name'], dob=request.data['dob'], gender=request.data['gender'], address=request.data['address'], phoneNo=request.data['phoneNo'], aadharNo=request.data['aadharNo'], userType=request.data['userType'], email=request.data['email'], password=request.data['password'])
            user_collection.insert_one(UserSerializer(user).data)
            check_user_collection.delete_one({'id': request.data['id']})
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        print(serializer.errors)   
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class ApproveOrganizationView(APIView):
    serializer_class = CreateOrganizationSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            org = Organization(id=request.data['id'],name=request.data['name'], orgType=request.data['orgType'], licenseNo=request.data['licenseNo'], address=request.data['address'], phoneNo=request.data['phoneNo'], email=request.data['email'], password=request.data['password'])
            org_collection.insert_one(OrganizationSerializer(org).data)
            check_org_collection.delete_one({'id': request.data['id']})
            return Response(OrganizationSerializer(org).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class RejectUserView(APIView):
    serializer_class = CreateUserSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            check_user_collection.delete_one({'id': request.data['id']})
            return Response(request.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class RejectOrganizationView(APIView):
    serializer_class = CreateOrganizationSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            check_org_collection.delete_one({'id': request.data['id']})
            return Response(request.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class DeleteUserView(APIView):
    serializer_class = CreateUserSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user_collection.delete_one({'id': request.data['id']})
            return Response(request.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class DeleteOrganizationView(APIView):
    serializer_class = CreateOrganizationSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            org_collection.delete_one({'id': request.data['id']})
            return Response(request.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

EXPIRY_TIME = 60 # seconds
# This class returns the string needed to generate the key
class generateKey:

    def returnValue(phone):
        return str(phone) + str(datetime.date(datetime.now())) + "Some Random Secret Key"

class GetOTPView(APIView):
    # Get to Create a call for OTP
    def get(self, request):
        phone = request.GET.get('phone')
        print(phone)
        try:
            Mobile = phoneModel.objects.get(Mobile=phone)  # if Mobile already exists the take this else create New One
        except ObjectDoesNotExist:
            phoneModel.objects.create(
                Mobile=phone,
            )
            Mobile = phoneModel.objects.get(Mobile=phone)  # user Newly created Model
        Mobile.save()  # Save the data
        keygen = generateKey()
        key = base64.b32encode(keygen.returnValue(phone).encode())  # Key is generated
        OTP = pyotp.TOTP(key,interval = EXPIRY_TIME)  # TOTP Model for OTP is created
        print(OTP.now())
        # Using Multi-Threading send the OTP Using Messaging Services like Twilio or Fast2sms
        return Response({"OTP": OTP.now()}, status=200)  # Just for demonstration

    # This Method verifies the OTP
    def post(self, request):
        phone = request.data.get('phone')
        try:
            Mobile = phoneModel.objects.get(Mobile=phone)
        except ObjectDoesNotExist:
            return Response("User does not exist", status=404)  # False Call

        keygen = generateKey()
        key = base64.b32encode(keygen.returnValue(phone).encode())  # Generating Key
        OTP = pyotp.TOTP(key,interval = EXPIRY_TIME)  # TOTP Model 
        if OTP.verify(request.data["otp"]):  # Verifying the OTP
            Mobile.isVerified = True
            Mobile.save()
            return Response("You are authorised", status=200)
        return Response("OTP is wrong/expired", status=400)