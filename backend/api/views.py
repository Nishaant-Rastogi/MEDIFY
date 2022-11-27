from ast import Or
from calendar import c
from cgi import test
import json
from tabnanny import check
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
import urllib
from django.contrib.auth.models import User as AuthUser
from django.contrib.auth import get_user_model
from datetime import datetime
from hashchain import records, ethereum
import base64 
from knox.models import AuthToken
from Crypto.Cipher import AES
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS, AllowAny
from Crypto.Util.Padding import pad,unpad
from Crypto.Random import get_random_bytes
from django.core.mail import EmailMessage
from django_csrf_protect_form import csrf_protect_form

client = MongoClient("mongodb+srv://fcs_admin:"+urllib.parse.quote("blackthureja@1234")+"@fcs-project.6ejl1sd.mongodb.net/test")
db = client['FCS_Project']

check_user_collection = db['admin_users']
check_org_collection = db['admin_organization']
user_collection = db['Users']
org_collection = db['Organizations']
document_collection = db['Documents']
admin_collection = db['Admin']
log_collection = db['Logs']
contract_collection = db['Contracts']

ETH_PRIVATE_KEY = 'cd1c09736ce0eb2f1cda86d1c5d426bae85de8bbb5e6200056ce6143b27c83b0'
ETH_PUBLIC_KEY = '0xd889370ca1bf99d18B9a7Fe9e16e004Ca2fE0331'
ETH_PROVIDER_URL = 'https://aurora-testnet.infura.io/v3/20fd4c6c32ad40ca9764f861e978d847'

def decrypt(enc):
    encryption_key = enc[-32:-16].encode()
    iv = enc[-16:].encode()
    cipher = AES.new(encryption_key, AES.MODE_CBC, iv)
    return json.loads(unpad(cipher.decrypt(base64.b64decode(enc[:-32])), AES.block_size))

def encrypt(data):
    encryption_key = get_random_bytes(16)
    iv = get_random_bytes(16)
    cipher = AES.new(encryption_key, AES.MODE_CBC, iv)
    return base64.b64encode(cipher.encrypt(pad(json.dumps(data).encode(), AES.block_size))).decode() + encryption_key.decode() + iv.decode()

# Create your views here.
class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer  

class CreateUserView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        name = decrypted_data['name']
        dob = decrypted_data['dob']
        gender = decrypted_data['gender']
        address = decrypted_data['address']
        phoneNo = decrypted_data['phoneNo']
        aadharNo = decrypted_data['aadharNo']
        userType = decrypted_data['userType']
        email = decrypted_data['email']
        password = decrypted_data['password']
        user_proof = decrypted_data['user_proof']
        if userType == 'D':
            specialization = decrypted_data['specialization']
            experience = decrypted_data['experience']
            hospital = decrypted_data['hospital']
            doctor_proof = decrypted_data['doctor_proof']
            doctor = Doctor(name=name, dob=dob, gender=gender, address=address, phoneNo=phoneNo, aadharNo=aadharNo, userType='D', email=email, password=password, specialization=specialization, experience=experience, hospital=hospital, user_proof=user_proof, doctor_proof=doctor_proof, verified=False)
            check_user_collection.insert_one(DoctorSerializer(doctor).data)
            data = {"name": DoctorSerializer(doctor).data['name'], "id": DoctorSerializer(doctor).data['id'], "email": DoctorSerializer(doctor).data['email']}
            return Response(data, status=status.HTTP_201_CREATED)

        user = User(name=name, dob=dob, gender=gender, address=address, phoneNo=phoneNo, aadharNo=aadharNo, userType='P', email=email, password=password, user_proof=user_proof, verified=False)
        check_user_collection.insert_one(UserSerializer(user).data)
        data = {"name": UserSerializer(user).data['name'], "id": UserSerializer(user).data['id'], "email": UserSerializer(user).data['email']}
        return Response(data, status=status.HTTP_201_CREATED)

class CreateOrganizationView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        name = decrypted_data['name']
        licenseNo = decrypted_data['licenseNo']
        address = decrypted_data['address']
        phoneNo = decrypted_data['phoneNo']
        orgType = decrypted_data['orgType']
        email = decrypted_data['email']
        password = decrypted_data['password']
        license_proof = decrypted_data['license_proof']
        org_images = decrypted_data['org_images']
        organization = Organization(name=name, orgType=orgType, licenseNo=licenseNo, address=address, phoneNo=phoneNo, email=email, password=password, license_proof=license_proof, org_images=org_images, verified=False)
        check_org_collection.insert_one(OrganizationSerializer(organization).data)
        data = {"name": OrganizationSerializer(organization).data['name'], "id": OrganizationSerializer(organization).data['id'], "email": OrganizationSerializer(organization).data['email']}
        return Response(data, status=status.HTTP_201_CREATED)

class GetAadharView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        aadharNo = decrypted_data['aadhar']
        response = True
        for user in user_collection.find():
            if user['aadharNo'] == aadharNo:
                response = False
                break
        return Response({"data": response}, status=status.HTTP_200_OK)

class GetLicenseView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        licenseNo = decrypted_data['license']
        response = True
        for org in org_collection.find():
            if org['licenseNo'] == licenseNo:
                response = False
                break
        return Response({"data": response}, status=status.HTTP_200_OK)

class GetEmailView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        email = decrypted_data['email']
        response = True
        for user in user_collection.find():
            if user['email'] == email:
                response = False
                break
        for org in org_collection.find():
            if org['email'] == email:
                response = False
                break
        return Response({"data":response}, status=status.HTTP_200_OK)

class VerifyView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        id = decrypted_data['id']
        if check_user_collection.find_one({'id': id}):
            check_user_collection.update_one({'id':id}, {'$set':{'verified':True}})
        else:
            check_org_collection.update_one({'id':id}, {'$set':{'verified':True}})
        return Response("Success",status=status.HTTP_200_OK)

class LoginUserView(APIView):   
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        id = decrypted_data['id']
        user = user_collection.find({'id': id})
        data = {"name": UserSerializer(user[0]).data['name'], "id": UserSerializer(user[0]).data['id'], "email": UserSerializer(user[0]).data['email'], "userType": UserSerializer(user[0]).data['userType'], "password": UserSerializer(user[0]).data['password']}
        # print(encrypt(data))
        if user:
            if UserSerializer(user[0]).data['userType'] == 'D':
                return Response(data, status=status.HTTP_200_OK)
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid credentials...'}, status=status.HTTP_400_BAD_REQUEST)

class LoginOrganizationView(APIView):
    # permission_classes = (AllowAny,)
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        id = decrypted_data['id']
        organization = org_collection.find({'id': id})
        # authUser = AuthUser.objects.create_user(UserSerializer(organization[0]).data['id'], UserSerializer(organization[0]).data['email'], UserSerializer(organization[0]).data['password'])
        # authUser.save()
        data = {"name": OrganizationSerializer(organization[0]).data['name'], "id": OrganizationSerializer(organization[0]).data['id'], "email": OrganizationSerializer(organization[0]).data['email'], "orgType": OrganizationSerializer(organization[0]).data['orgType'], "password": OrganizationSerializer(organization[0]).data['password']}
        if organization:
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class LoginAdminView(APIView):
    def post(self, request, format=None):
        print(request.data['data'])
        decrypted_data = decrypt(request.data['data'])
        print(decrypted_data)
        id = decrypted_data['id']
        password = decrypted_data['password']
        admin = admin_collection.find({'id': id, 'password': password})
        data = {"id": AdminSerializer(admin[0]).data['id']}
        if admin:
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class GetCheckUsersView(APIView):
    def get(self, request, format=None):
        users = check_user_collection.find({})
        check_users = []
        for user in users:
            if user['userType'] == 'D':
                user = Doctor(user['id'], user['name'], user['dob'], gender=user['gender'], address=user['address'], phoneNo=user['phoneNo'], aadharNo=user['aadharNo'], userType=user['userType'], email=user['email'], password=user['password'], specialization=user['specialization'], experience=user['experience'], hospital=user['hospital'], user_proof=user['user_proof'], doctor_proof=user['doctor_proof'], verified=user['verified'])
                DoctorSerializer(user).data.pop('password')
                check_users.append(DoctorSerializer(user).data)
            else:
                user = User(id=user['id'], name=user['name'], dob=user['dob'], gender=user['gender'], address=user['address'], phoneNo=user['phoneNo'], aadharNo=user['aadharNo'], userType=user['userType'], email=user['email'], password=user['password'], user_proof=user['user_proof'], verified=user['verified'])
                UserSerializer(user).data.pop('password')
                check_users.append(UserSerializer(user).data)
        print(check_users)
        return Response(check_users, status=status.HTTP_200_OK)

class GetCheckOrganizationsView(APIView):
    def get(self, request, format=None):
        orgs = check_org_collection.find({})
        check_orgs = []
        for org in orgs:
            org = Organization(id=org['id'], name=org['name'], orgType=org['orgType'], licenseNo=org['licenseNo'], address=org['address'], phoneNo=org['phoneNo'], email=org['email'], password=org['password'], license_proof=org['license_proof'], org_images=org['org_images'], verified=org['verified'])
            OrganizationSerializer(org).data.pop('password')
            check_orgs.append(OrganizationSerializer(org).data)
        return Response(check_orgs, status=status.HTTP_200_OK)

class GetUsersView(APIView):
    def get(self, request, format=None):
        users = user_collection.find({})
        all_users = []
        for user in users:
            if user['userType'] == 'D':
                DoctorSerializer(user).data.pop('password')
                all_users.append(DoctorSerializer(user).data)
            else:
                UserSerializer(user).data.pop('password')
                all_users.append(UserSerializer(user).data)
        return Response(all_users, status=status.HTTP_200_OK)

class GetUserView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        print(decrypted_data)
        id = decrypted_data['id']
        user = user_collection.find({'id': id})
        data = {"name": UserSerializer(user[0]).data['name'], "id": UserSerializer(user[0]).data['id'], "email": UserSerializer(user[0]).data['email'], "gender": UserSerializer(user[0]).data['gender'], "dob": UserSerializer(user[0]).data['dob'], "address": UserSerializer(user[0]).data['address'], "phoneNo": UserSerializer(user[0]).data['phoneNo'], "aadharNo": UserSerializer(user[0]).data['aadharNo'], "userType": UserSerializer(user[0]).data['userType'], "password": UserSerializer(user[0]).data['password'], "balance": UserSerializer(user[0]).data['balance']}
        if user:
            if UserSerializer(user[0]).data['userType'] == 'D':
                return Response(data, status=status.HTTP_200_OK)
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class UpdateUserView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        dob = decrypted_data['dob']
        gender = decrypted_data['gender']
        address = decrypted_data['address']
        phoneNo = decrypted_data['phoneNo']
        balance = decrypted_data['balance']
        id = decrypted_data['id']
        user_collection.update_one({'id': id}, {'$set': {'dob': dob, 'gender': gender, 'address': address, 'phoneNo': phoneNo, 'balance': balance}})
        user = user_collection.find({'id': id})

        return Response("Successfully Updated!", status=status.HTTP_200_OK)

class UpdateOrganizationView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        address = decrypted_data['address']
        phoneNo = decrypted_data['phoneNo']
        balance = decrypted_data['balance']
        id = decrypted_data['id']
        org_collection.update_one({'id': id}, {'$set': { 'address': address, 'phoneNo': phoneNo, 'balance': balance}})
        org = org_collection.find({'id': id})
        return Response("Successfully Updated!", status=status.HTTP_200_OK)

class GetOrganizationView(APIView):
    ##@csrf_protect_form
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        id = decrypted_data['id']
        org = org_collection.find({'id': id})
        data = {"name": OrganizationSerializer(org[0]).data['name'], "id": OrganizationSerializer(org[0]).data['id'], "email": OrganizationSerializer(org[0]).data['email'], "orgType": OrganizationSerializer(org[0]).data['orgType'], "licenseNo": OrganizationSerializer(org[0]).data['licenseNo'], "address": OrganizationSerializer(org[0]).data['address'], "phoneNo": OrganizationSerializer(org[0]).data['phoneNo'],  "balance": OrganizationSerializer(org[0]).data['balance']}
        return Response(data, status=status.HTTP_200_OK)

class GetOrganizationsView(APIView):
    def get(self, request, format=None):
        orgs = org_collection.find({})
        return Response(OrganizationSerializer(orgs, many=True).data, status=status.HTTP_200_OK)

class GetHospitalsView(APIView):
    def get(self, request, format=None):
        orgs = org_collection.find({'orgType': 'H'})
        data = []
        for org in orgs:
            data.append({"name": OrganizationSerializer(org).data['name'], "id": OrganizationSerializer(org).data['id'], "email": OrganizationSerializer(org).data['email'], "licenseNo": OrganizationSerializer(org).data['licenseNo'], "address": OrganizationSerializer(org).data['address'], "phoneNo": OrganizationSerializer(org).data['phoneNo']})
        return Response(data, status=status.HTTP_200_OK)

class GetDoctorsView(APIView):
    def get(self, request, format=None):
        users = user_collection.find({'userType': 'D'})
        return Response(UserSerializer(users, many=True).data, status=status.HTTP_200_OK)

class GetPatientsView(APIView):
    def get(self, request, format=None):
        users = user_collection.find({'userType': 'P'})
        return Response(UserSerializer(users, many=True).data, status=status.HTTP_200_OK)

class GetPharmaciesView(APIView):
    def get(self, request, format=None):
        orgs = org_collection.find({'orgType': 'P'})
        data = []
        for org in orgs:
            data.append({"name": OrganizationSerializer(org).data['name'], "id": OrganizationSerializer(org).data['id'], "email": OrganizationSerializer(org).data['email'], "licenseNo": OrganizationSerializer(org).data['licenseNo'], "address": OrganizationSerializer(org).data['address'], "phoneNo": OrganizationSerializer(org).data['phoneNo']})
        return Response(data, status=status.HTTP_200_OK)

class GetInsuranceView(APIView):
    def get(self, request, format=None):
        orgs = org_collection.find({'orgType': 'I'})
        data = []
        for org in orgs:
            data.append({"name": OrganizationSerializer(org).data['name'], "id": OrganizationSerializer(org).data['id'], "email": OrganizationSerializer(org).data['email'], "licenseNo": OrganizationSerializer(org).data['licenseNo'], "address": OrganizationSerializer(org).data['address'], "phoneNo": OrganizationSerializer(org).data['phoneNo']})
        return Response(data, status=status.HTTP_200_OK)

class ApproveUserView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        userType = decrypted_data['userType']
        if userType == 'P':
            user = User(id=decrypted_data['id'], name=decrypted_data['name'], dob=decrypted_data['dob'], gender=decrypted_data['gender'], address=decrypted_data['address'], phoneNo=decrypted_data['phoneNo'], aadharNo=decrypted_data['aadharNo'], userType=decrypted_data['userType'], email=decrypted_data['email'], password=decrypted_data['password'], user_proof=decrypted_data['user_proof'], verified=decrypted_data['verified'])
            user_collection.insert_one(UserSerializer(user).data)
            check_user_collection.delete_one({'id': decrypted_data['id']})
            data = {'id': decrypted_data['id'], 'name': decrypted_data['name'], 'email': decrypted_data['email']}
            return Response(data, status=status.HTTP_200_OK)
        elif userType == 'D':
            doctor = Doctor(id=decrypted_data['id'], name=decrypted_data['name'], dob=decrypted_data['dob'], gender=decrypted_data['gender'], address=decrypted_data['address'], phoneNo=decrypted_data['phoneNo'], aadharNo=decrypted_data['aadharNo'], userType=decrypted_data['userType'], email=decrypted_data['email'], password=decrypted_data['password'], user_proof=decrypted_data['user_proof'], doctor_proof=decrypted_data['doctor_proof'], specialization=decrypted_data['specialization'], experience=decrypted_data['experience'], hospital=decrypted_data['hospital'], verified=decrypted_data['verified'])
            user_collection.insert_one(DoctorSerializer(doctor).data)
            check_user_collection.delete_one({'id': decrypted_data['id']})
            data = {'id': decrypted_data['id'], 'name': decrypted_data['name'], 'email': decrypted_data['email']}
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class ApproveOrganizationView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        org = Organization(id=decrypted_data['id'],name=decrypted_data['name'], orgType=decrypted_data['orgType'], licenseNo=decrypted_data['licenseNo'], address=decrypted_data['address'], phoneNo=decrypted_data['phoneNo'], email=decrypted_data['email'], password=decrypted_data['password'], license_proof=decrypted_data['license_proof'], org_images=decrypted_data['org_images'], verified=decrypted_data['verified'])
        org_collection.insert_one(OrganizationSerializer(org).data)
        check_org_collection.delete_one({'id': decrypted_data['id']})
        data = {'id': decrypted_data['id'], 'name': decrypted_data['name'], 'email': decrypted_data['email']}
        return Response(data, status=status.HTTP_200_OK)

class RejectUserView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        check_user_collection.delete_one({'id': decrypted_data['id']})
        return Response("User Rejected", status=status.HTTP_200_OK)

class RejectOrganizationView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        check_org_collection.delete_one({'id': decrypted_data['id']})
        return Response("User Rejected", status=status.HTTP_200_OK)

class DeleteUserView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        user_collection.delete_one({'id': decrypted_data['id']})
        return Response("Deleted User", status=status.HTTP_200_OK)

class DeleteOrganizationView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        org_collection.delete_one({'id': decrypted_data['id']})
        return Response("Deleted Organisation", status=status.HTTP_200_OK)

class CreateConsultationView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        consultation = Consultation(patient_id=decrypted_data['patient_id'], doctor_id=decrypted_data['doctor_id'], patient_name=decrypted_data['patient_name'], doctor_name=decrypted_data['doctor_name'], patient_gender = decrypted_data['patient_gender'], patient_email = decrypted_data['patient_email'], problem=decrypted_data['problem'])
        return Response(ConsultationSerializer(consultation).data, status=status.HTTP_200_OK)

class CreatePrescriptionView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        prescription = Prescription(consultation_id=decrypted_data['consultation_id'] ,patient_id=decrypted_data['patient_id'], doctor_id=decrypted_data['doctor_id'], patient_name=decrypted_data['patient_name'], doctor_name=decrypted_data['doctor_name'], medicine=decrypted_data['medicine'], dosage=decrypted_data['dosage'], duration=decrypted_data['duration'], test=decrypted_data['test'])
        document_collection.insert_one(PrescriptionSerializer(prescription).data)
        document_collection.update_one({'id': decrypted_data['consultation_id']}, {'$set': {'prescribed': True}})

        return Response(PrescriptionSerializer(prescription).data, status=status.HTTP_200_OK)

class UpdateConsultationView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        id = decrypted_data['id']
        document_collection.update_one({'id': id}, {'$set': {'visible': False}})
        consultation = document_collection.find_one({'id': id})
        return Response(ConsultationSerializer(consultation).data, status=status.HTTP_200_OK)

class UpdatePrescriptionView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        id = decrypted_data['id']
        document_collection.update_one({'id': id}, {'$set': {'visible': False}})
        prescription = document_collection.find_one({'id': id})
        return Response(PrescriptionSerializer(prescription).data, status=status.HTTP_200_OK)

class UpdateTestResultView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        id = decrypted_data['id']
        document_collection.update_one({'id': id}, {'$set': {'visible': False}})
        testResult = document_collection.find_one({'id': id})
        return Response(TestResultSerializer(testResult).data, status=status.HTTP_200_OK)

class UpdateBillView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        id = decrypted_data['id']
        document_collection.update_one({'id': id}, {'$set': {'visible': False}})
        return Response("Successfully Deleted", status=status.HTTP_200_OK)

class GetBillView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        id = decrypted_data['id']
        bills = document_collection.find({'patient_id': id, 'visible': True})
        all_bills = []
        for bill in bills:
            if bill['docType'] == 'BC':
                all_bills.append(ConsultationBillSerializer(bill).data)
            elif bill['docType'] == 'BP':
                all_bills.append(PharmacyBillSerializer(bill).data)
            elif bill['docType'] == 'BT':
                all_bills.append(TestResultBillSerializer(bill).data)
            elif bill['docType'] == 'BI':
                all_bills.append(InsuranceBillSerializer(bill).data)
        
        return Response(all_bills, status=status.HTTP_200_OK)

class GetUnClaimBillView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        id = decrypted_data['id']
        bills = document_collection.find({'patient_id': id, 'visible': True, 'claimed': False})
        all_bills = []
        for bill in bills:
            if bill['docType'] == 'BC':
                all_bills.append(ConsultationBillSerializer(bill).data)
            elif bill['docType'] == 'BP':
                all_bills.append(PharmacyBillSerializer(bill).data)
            elif bill['docType'] == 'BT':
                all_bills.append(TestResultBillSerializer(bill).data)
        
        return Response(all_bills, status=status.HTTP_200_OK)

class GetDoctorBillView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
            decrypted_data = decrypt(request.data['data'])
            id = decrypted_data['id']
            bills = document_collection.find({'docType': 'BC', 'visible': True})
            all_bills = []
            for bill in bills:
                if bill['doctor_id'] == id:
                    all_bills.append(ConsultationBillSerializer(bill).data)
            return Response(all_bills, status=status.HTTP_200_OK)

class GetHospitalBillView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        id = decrypted_data['id']
        bills = document_collection.find({'docType': 'BT', 'visible': True})
        all_bills = []
        for bill in bills:
            if bill['hospital_id'] == id:
                all_bills.append(TestResultBillSerializer(bill).data)
        return Response(all_bills, status=status.HTTP_200_OK)

class GetPharmacyBillView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        id = decrypted_data['id']
        bills = document_collection.find({'docType': 'BP', 'visible': True})
        all_bills = []
        for bill in bills:
            if bill['pharmacy_id'] == id:
                all_bills.append(PharmacyBillSerializer(bill).data)
        print(all_bills)
        return Response(all_bills, status=status.HTTP_200_OK)

# Document Types Discussion

class GetConsultationView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        patient_id = decrypted_data['id']
        documents = document_collection.find({'patient_id': patient_id, 'docType': 'C', 'visible': True})
        return Response(ConsultationSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class GetPrescriptionView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        patient_id = decrypted_data['id']
        documents = document_collection.find({'patient_id': patient_id, 'docType': 'P', 'visible': True})
        return Response(PrescriptionSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class GetPrescriptionBuyMedicineView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        patient_id = decrypted_data['id']
        documents = document_collection.find({'patient_id': patient_id, 'docType': 'P', 'visible': True, 'medicine_bought': False})
        return Response(PrescriptionSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class GetDoctorPrescriptionView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        doctor_id = decrypted_data['id']
        documents = document_collection.find({'docType': 'P'})
        all_documents = []
        for document in documents:
            if document['doctor_id'] == doctor_id:
                all_documents.append(PrescriptionSerializer(document).data)
        return Response(all_documents, status=status.HTTP_200_OK)

class GetDoctorConsultationView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        doctor_id = decrypted_data['id']
        documents = document_collection.find({'doctor_id': doctor_id, 'docType': 'C', 'prescribed': False})
        return Response(ConsultationSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class CreateTestResultView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        test_result = TestResult(prescription_id=decrypted_data['prescription_id'], patient_id=decrypted_data['patient_id'], hospital_name=decrypted_data['hospital_name'], patient_name=decrypted_data['patient_name'],  test=decrypted_data['test'], test_result=decrypted_data['test_result'], hospital_id=decrypted_data['hospital_id'])
        document_collection.insert_one(TestResultSerializer(test_result).data)
        return Response(TestResultSerializer(test_result).data, status=status.HTTP_200_OK)

class GetTestResultView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        patient_id = decrypted_data['id']
        documents = document_collection.find({'patient_id': patient_id, 'docType': 'T', 'visible': True})
        return Response(TestResultSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class GetTestResultHospitalView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        hospital_id = decrypted_data['id']
        documents = document_collection.find({'hospital_id': hospital_id, 'docType': 'T', 'visible': True})
        return Response(TestResultSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class CreateConsultationBillView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        consultation = Consultation(patient_id=decrypted_data['consultation']['patient_id'], doctor_id=decrypted_data['consultation']['doctor_id'], patient_name=decrypted_data['consultation']['patient_name'], doctor_name=decrypted_data['consultation']['doctor_name'], patient_gender=decrypted_data['consultation']['patient_gender'], patient_email=decrypted_data['consultation']['patient_email'], problem=decrypted_data['consultation']['problem'])
        consultation_bill = ConsultationBill(consultation_id=decrypted_data['consultation']['id'], patient_id=decrypted_data['patient_id'], doctor_id=decrypted_data['doctor_id'], patient_name=decrypted_data['patient_name'], doctor_name=decrypted_data['doctor_name'], amount=decrypted_data['amount'], insurance_id=decrypted_data['insurance_id'], insurance_name=decrypted_data['insurance_name'])
        patient_balance = user_collection.find_one({'id': decrypted_data['patient_id']})['balance']
        if(int(patient_balance) < int(decrypted_data['amount'])):
            return Response({'Bad Request': 'Insufficient Balance...'}, status=status.HTTP_400_BAD_REQUEST)
        user_collection.update_one({'id': decrypted_data['patient_id']}, {'$set': {'balance': int(patient_balance) - int(decrypted_data['amount'])}})
        doctor_balance = user_collection.find_one({'id': decrypted_data['doctor_id']})['balance']
        user_collection.update_one({'id': decrypted_data['doctor_id']}, {'$set': {'balance': int(doctor_balance) + int(decrypted_data['amount'])}})
        document_collection.insert_one(ConsultationBillSerializer(consultation_bill).data)
        document_collection.insert_one(ConsultationSerializer(consultation).data)
        print(ConsultationBillSerializer(consultation_bill).data)
        return Response(ConsultationBillSerializer(consultation_bill).data, status=status.HTTP_200_OK)

class CreateTestResultBillView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        test_result_bill = TestResultBill(prescription_id=decrypted_data['prescription_id'], patient_id=decrypted_data['patient_id'], hospital_id=decrypted_data['hospital_id'], patient_name=decrypted_data['patient_name'], hospital_name=decrypted_data['hospital_name'], amount=decrypted_data['amount'], insurance_id=decrypted_data['insurance_id'], insurance_name=decrypted_data['insurance_name'], test=decrypted_data['test'])
        patient_balance = user_collection.find_one({'id': decrypted_data['patient_id']})['balance']
        if(int(patient_balance) < int(decrypted_data['amount'])):
            return Response({'Bad Request': 'Insufficient Balance...'}, status=status.HTTP_400_BAD_REQUEST)
        user_collection.update_one({'id': decrypted_data['patient_id']}, {'$set': {'balance': int(patient_balance) - int(decrypted_data['amount'])}})
        hospital_balance = org_collection.find_one({'id': decrypted_data['hospital_id']})['balance']
        org_collection.update_one({'id': decrypted_data['hospital_id']}, {'$set': {'balance': int(hospital_balance) + int(decrypted_data['amount'])}})
        document_collection.insert_one(TestResultBillSerializer(test_result_bill).data)
        return Response(TestResultBillSerializer(test_result_bill).data, status=status.HTTP_200_OK)

class CreatePharmacyBillView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):            
        decrypted_data = decrypt(request.data['data'])
        pharmacy_bill = PharmacyBill(prescription_id=decrypted_data['prescription_id'], patient_id=decrypted_data['patient_id'], pharmacy_id=decrypted_data['pharmacy_id'], patient_name=decrypted_data['patient_name'], pharmacy_name=decrypted_data['pharmacy_name'], amount=decrypted_data['amount'], insurance_id=decrypted_data['insurance_id'], insurance_name=decrypted_data['insurance_name'], medicine=decrypted_data['medicine'])
        patient_balance = user_collection.find_one({'id': decrypted_data['patient_id']})['balance']
        if(int(patient_balance) < int(decrypted_data['amount'])):
            return Response({'Bad Request': 'Insufficient Balance...'}, status=status.HTTP_400_BAD_REQUEST)
        user_collection.update_one({'id': decrypted_data['patient_id']}, {'$set': {'balance': int(patient_balance) - int(decrypted_data['amount'])}})
        pharmacy_balance = org_collection.find_one({'id': decrypted_data['pharmacy_id']})['balance']
        org_collection  .update_one({'id': decrypted_data['pharmacy_id']}, {'$set': {'balance': int(pharmacy_balance) + int(decrypted_data['amount'])}})
        document_collection.insert_one(PharmacyBillSerializer(pharmacy_bill).data)

        return Response(PharmacyBillSerializer(pharmacy_bill).data, status=status.HTTP_200_OK)

class GetPharmacyOrderView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        pharmacy_order = document_collection.find({'docType':'BP'})
        orders = []
        for order in pharmacy_order:
            orders.append(PharmacyBillSerializer(order).data)
        return Response(orders, status=status.HTTP_200_OK)

class GetUserPharmacyOrderView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        pharmacy_order = document_collection.find({'docType':'BP'})
        orders = []
        for order in pharmacy_order:
            if order['patient_id'] == decrypted_data['id']:
                orders.append(PharmacyBillSerializer(order).data)
        print(orders)
        return Response(orders, status=status.HTTP_200_OK)

class ClaimRefundView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        patient_id = decrypted_data['patient_id']
        insurance_id = decrypted_data['insurance_id']
        refund = decrypted_data['refund_amount']
        bill_id = decrypted_data['bill_id']
        document_collection.update_one({'id': bill_id}, {'$set': {'claimed': True}})
        insurance_bill = InsuranceBill(bill_id=bill_id, patient_id=patient_id, insurance_id=insurance_id, refund=refund)
        patient_balance = user_collection.find_one({'id': patient_id})['balance']
        insurance_balance = org_collection.find_one({'id': insurance_id})['balance']
        if int(insurance_balance) < int(refund):
            return Response({'Bad Request': 'Insufficient Balance...'}, status=status.HTTP_400_BAD_REQUEST)
        print(patient_id, insurance_id, refund, bill_id)
        user_collection.update_one({'id': patient_id}, {'$set': {'balance': int(patient_balance) + int(refund)}})
        org_collection.update_one({'id': insurance_id}, {'$set': {'balance': int(insurance_balance) - int(refund)}})
        document_collection.insert_one(InsuranceBillSerializer(insurance_bill).data)
        return Response(InsuranceBillSerializer(insurance_bill).data, status=status.HTTP_200_OK)

class GetInsuranceBillView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        insurance_bill = document_collection.find({'docType':'BI'})
        bills = []
        for bill in insurance_bill:
            if(bill['insurance_id'] == decrypted_data['id']):
                bills.append(InsuranceBillSerializer(bill).data)
        return Response(bills, status=status.HTTP_200_OK)

class GetClaimView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        claim = document_collection.find({'patient_id': decrypted_data['id'], 'docType': {'$regex':"B"},'claimed':True})
        return Response(claim, status=status.HTTP_200_OK)

class GetHospitalDoctorsView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        hospital_id = decrypted_data['id']
        doctors = []
        for doctor in user_collection.find({'userType': 'D'}):
            if(doctor['hospital'] == hospital_id):
                doctors.append(DoctorSerializer(doctor).data)
        return Response(DoctorSerializer(doctors, many=True).data, status=status.HTTP_200_OK)

class AddBlockView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        print(decrypted_data)
        if contract_collection.find_one({}) is None:
            print('Deploying contract ...')
            contract = ethereum.EthContract()
            contract.deploy(ETH_PUBLIC_KEY, ETH_PRIVATE_KEY, ETH_PROVIDER_URL)
            contract.get_txn_receipt()
            print('Contract deployed. Address: {}'.format(contract.address))
            contract_interface = dict(address=contract.address, abi=contract.abi)
            contract_collection.insert_one(contract_interface)
        print("Connecting to contract ...")
        contract_interface = contract_collection.find_one({})
        connector = ethereum.EthConnector(
            contract_abi=contract_interface['abi'],
            contract_address=contract_interface['address'],
            sender_public_key=ETH_PUBLIC_KEY,
            sender_private_key=ETH_PRIVATE_KEY,
            provider_url=ETH_PROVIDER_URL
        )
        print('Adding block ...')

        blockData = {
            'timestamp': decrypted_data['timestamp'],
            'document': decrypted_data['document'],
        }
        try:
            last_record = list(log_collection.find({"blockChainID": 'MEDIFY'}).sort([("timestamp", -1)]))[0]
            last_record_hash = last_record['document']

        except:
            last_record_hash = None

        record = records.Record(blockData, last_record_hash)
        print('Record created')
        transaction_hash = connector.record(decrypted_data['id'], record.get_hash())
        print("transaction successful")
        connector1 = ethereum.EthConnector(
            contract_abi=contract_interface['abi'],
            contract_address=contract_interface['address'],
            sender_public_key=ETH_PUBLIC_KEY,
            sender_private_key=ETH_PRIVATE_KEY,
            provider_url=ETH_PROVIDER_URL
        )
        print('Getting block ...')
        doc_hash = connector1.get_record(decrypted_data['id'])
        print(doc_hash == record.get_hash())
        blockData['id'] = decrypted_data['id']
        blockData['contract_address'] = contract_interface['address']
        blockData['document'] = doc_hash
        blockData['blockChainID'] = 'MEDIFY'
        blockData['last_record_hash'] = last_record_hash
        blockData['transaction_hash'] = transaction_hash
        log_collection.insert_one(blockData)
        return Response({'Success': 'Block Added...'}, status=status.HTTP_200_OK)

class GetBlocksView(APIView):
    def get(self, request, format=None):
        chain = log_collection.find({})
        data = []
        for block in chain:
            data.append(LogSerializer(block).data)
        print(data)
        return Response(data, status=status.HTTP_200_OK)

class SendMailView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        status = False
        try:
            email = EmailMessage("New message from MEDIFY", "Hello "+decrypted_data['name']+",\nThank You for Signing Up on Medify.\nHere is your OTP for verification.\n"+decrypted_data['otp']+"\nBest wishes,\nMedify Team", to=[decrypted_data['email'],])
            email.send()
            status = True
        except Exception as e:
            print(e)    
        return Response({'Mail sent Successfully!'}, status=status.HTTP_200_OK)

class SendMailIdView(APIView):
    ##@csrf_protect_form 
    def post(self, request, format=None):
        decrypted_data = decrypt(request.data['data'])
        print(decrypted_data)
        status = False
        try:
            email = EmailMessage("New message from MEDIFY", "Hello "+decrypted_data['name']+",\nThank You for Signing Up on Medify.\nHere is your ID for login.\n"+decrypted_data['id']+"\nBest wishes,\nMedify Team", to=[decrypted_data['email'],])
            email.send()
            status = True
        except Exception as e:
            print(e)    
        return Response({'Mail sent Successfully!'}, status=status.HTTP_200_OK)
