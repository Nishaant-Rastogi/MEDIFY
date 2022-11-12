from ast import Or
from calendar import c
from cgi import test
import re
from tabnanny import check
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
import urllib
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
import bcrypt

client = MongoClient("mongodb+srv://fcs_admin:"+urllib.parse.quote("blackthureja@1234")+"@fcs-project.6ejl1sd.mongodb.net/test")
db = client['FCS_Project']

check_user_collection = db['admin_users']
check_org_collection = db['admin_organization']
user_collection = db['Users']
org_collection = db['Organizations']
document_collection = db['Documents']
admin_collection = db['Admin']

# Create your views here.
class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer  

class CreateUserView(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        name = request.data['name']
        dob = request.data['dob']
        gender = request.data['gender']
        address = request.data['address']
        phoneNo = request.data['phoneNo']
        aadharNo = request.data['aadharNo']
        userType = request.data['userType']
        email = request.data['email']
        password = request.data['password']
        if userType == 'D':
            specialization = request.data['specialization']
            experience = request.data['experience']
            hospital = request.data['hospital']
            doctor = Doctor(name=name, dob=dob, gender=gender, address=address, phoneNo=phoneNo, aadharNo=aadharNo, userType='D', email=email, password=password, specialization=specialization, experience=experience, hospital=hospital)
            doctor.save()
            check_user_collection.insert_one(DoctorSerializer(doctor).data)
            return Response(DoctorSerializer(doctor).data, status=status.HTTP_201_CREATED)

        user = User(name=name, dob=dob, gender=gender, address=address, phoneNo=phoneNo, aadharNo=aadharNo, userType='P', email=email, password=password)
        user.save()
        check_user_collection.insert_one(UserSerializer(user).data)
        return Response(CreateUserSerializer(user).data, status=status.HTTP_201_CREATED)

class CreateOrganizationView(APIView):
    serializer_class = CreateOrganizationSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
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
            organization.save()
            check_org_collection.insert_one(OrganizationSerializer(organization).data)
            return Response(CreateOrganizationSerializer(organization).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(APIView):
    serializer_class = UserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        id = request.data['id']
        password = request.data['password']
        user = user_collection.find({'id': id})
        if user:
            if UserSerializer(user[0]).data['userType'] == 'D':
                return Response(DoctorSerializer(user[0]).data, status=status.HTTP_200_OK)
            return Response(UserSerializer(user[0]).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid credentials...'}, status=status.HTTP_400_BAD_REQUEST)

class LoginOrganizationView(APIView):
    serializer_class = OrganizationSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        id = request.data['id']
        password = request.data['password']
        organization = org_collection.find({'id': id})
        if organization:
            return Response(OrganizationSerializer(organization[0]).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class LoginAdminView(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        id = request.data['id']
        password = request.data['password']
        admin = admin_collection.find({'id': id, 'password': password})
        if admin:
            return Response(AdminSerializer(admin[0]).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class GetCheckUsersView(APIView):
    serializer_class = UserSerializer
    def get(self, request, format=None):
        users = check_user_collection.find({})
        check_users = []
        for user in users:
            if user['userType'] == 'D':
                check_users.append(DoctorSerializer(user).data)
            else:
                check_users.append(UserSerializer(user).data)
        return Response(check_users, status=status.HTTP_200_OK)

class GetCheckOrganizationsView(APIView):
    serializer_class = OrganizationSerializer
    def get(self, request, format=None):
        orgs = check_org_collection.find({})
        return Response(OrganizationSerializer(orgs, many=True).data, status=status.HTTP_200_OK)

class GetUsersView(APIView):
    serializer_class = UserSerializer
    def get(self, request, format=None):
        users = user_collection.find({})
        all_users = []
        for user in users:
            if user['userType'] == 'D':
                all_users.append(DoctorSerializer(user).data)
            else:
                all_users.append(UserSerializer(user).data)
        return Response(all_users, status=status.HTTP_200_OK)

class GetUserView(APIView):
    serializer_class = UserSerializer
    def post(self, request, format=None):
        id = request.data['id']
        user = user_collection.find({'id': id})
        if user:
            if UserSerializer(user[0]).data['userType'] == 'D':
                return Response(DoctorSerializer(user[0]).data, status=status.HTTP_200_OK)
            return Response(UserSerializer(user[0]).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

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
    def post(self, request, format=None):
        userType = request.data['userType']
        if userType == 'P':
            user = User(id=request.data['id'], name=request.data['name'], dob=request.data['dob'], gender=request.data['gender'], address=request.data['address'], phoneNo=request.data['phoneNo'], aadharNo=request.data['aadharNo'], userType=request.data['userType'], email=request.data['email'], password=request.data['password'])
            user_collection.insert_one(UserSerializer(user).data)
            check_user_collection.delete_one({'id': request.data['id']})
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        elif userType == 'D':
            doctor = Doctor(id=request.data['id'], name=request.data['name'], dob=request.data['dob'], gender=request.data['gender'], address=request.data['address'], phoneNo=request.data['phoneNo'], aadharNo=request.data['aadharNo'], userType=request.data['userType'], email=request.data['email'], password=request.data['password'], specialization=request.data['specialization'], experience=request.data['experience'], hospital=request.data['hospital'])
            user_collection.insert_one(DoctorSerializer(doctor).data)
            check_user_collection.delete_one({'id': request.data['id']})
            return Response(DoctorSerializer(doctor).data, status=status.HTTP_200_OK)
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

class CreateConsultationView(APIView):
    serializer_class = CreateConsultationSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            consultation = Consultation(patient_id=request.data['patient_id'], doctor_id=request.data['doctor_id'], patient_name=request.data['patient_name'], doctor_name=request.data['doctor_name'], patient_gender = request.data['patient_gender'], patient_email = request.data['patient_email'], problem=request.data['problem'])
            document_collection.insert_one(ConsultationSerializer(consultation).data)
            return Response(ConsultationSerializer(consultation).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class CreatePrescriptionView(APIView):
    serializer_class = CreatePrescriptionSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            prescription = Prescription(consultation_id=request.data['consultation_id'] ,patient_id=request.data['patient_id'], doctor_id=request.data['doctor_id'], patient_name=request.data['patient_name'], doctor_name=request.data['doctor_name'], medicine=request.data['medicine'], dosage=request.data['dosage'], duration=request.data['duration'], test=request.data['test'])
            document_collection.insert_one(PrescriptionSerializer(prescription).data)
            document_collection.update_one({'id': request.data['consultation_id']}, {'$set': {'prescribed': True}})
    
            return Response(PrescriptionSerializer(prescription).data, status=status.HTTP_200_OK)

class UpdateConsultationView(APIView):
    def post(self, request, format=None):
        id = request.data['id']
        document_collection.update_one({'id': id}, {'$set': {'visible': False}})
        consultation = document_collection.find_one({'id': id})
        return Response(ConsultationSerializer(consultation).data, status=status.HTTP_200_OK)

class UpdatePrescriptionView(APIView):
    def post(self, request, format=None):
        id = request.data['id']
        document_collection.update_one({'id': id}, {'$set': {'visible': False}})
        prescription = document_collection.find_one({'id': id})
        return Response(PrescriptionSerializer(prescription).data, status=status.HTTP_200_OK)

class UpdateTestResultView(APIView):
    def post(self, request, format=None):
        id = request.data['id']
        document_collection.update_one({'id': id}, {'$set': {'visible': False}})
        testResult = document_collection.find_one({'id': id})
        return Response(TestResultSerializer(testResult).data, status=status.HTTP_200_OK)

class UpdateBillView(APIView):
    def post(self, request, format=None):
        id = request.data['id']
        document_collection.update_one({'id': id}, {'$set': {'visible': False}})
        return Response("Successfully Deleted", status=status.HTTP_200_OK)

class GetBillView(APIView):
    def post(self, request, format=None):
        id = request.data['id']
        bills = document_collection.find({'patient_id': id, 'visible': True})
        all_bills = []
        for bill in bills:
            if bill['docType'] == 'BC':
                all_bills.append(ConsultationBillSerializer(bill).data)
            elif bill['docType'] == 'BP':
                all_bills.append(PharmacyBillSerializer(bill).data)
            elif bill['docType'] == 'BT':
                all_bills.append(TestResultBillSerializer(bill).data)
        
        return Response(all_bills, status=status.HTTP_200_OK)

class GetUnClaimBillView(APIView):
    def post(self, request, format=None):
        id = request.data['id']
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
 def post(self, request, format=None):
        id = request.data['id']
        bills = document_collection.find({'docType': 'BC', 'visible': True})
        all_bills = []
        for bill in bills:
            if bill['doctor_id'] == id:
                all_bills.append(ConsultationBillSerializer(bill).data)
        return Response(all_bills, status=status.HTTP_200_OK)

class GetHospitalBillView(APIView):
    def post(self, request, format=None):
        id = request.data['id']
        bills = document_collection.find({'docType': 'BT', 'visible': True})
        all_bills = []
        for bill in bills:
            if bill['hospital_id'] == id:
                all_bills.append(TestResultBillSerializer(bill).data)
        return Response(all_bills, status=status.HTTP_200_OK)

class GetPharmacyBillView(APIView):
    def post(self, request, format=None):
        id = request.data['id']
        bills = document_collection.find({'docType': 'BP', 'visible': True})
        all_bills = []
        for bill in bills:
            if bill['pharmacy_id'] == id:
                all_bills.append(PharmacyBillSerializer(bill).data)
        print(all_bills)
        return Response(all_bills, status=status.HTTP_200_OK)

# Document Types Discussion
class GetConsultationView(APIView):
    serializer_class = CreateConsultationSerializer
    def post(self, request, format=None):
        patient_id = request.data['id']
        documents = document_collection.find({'patient_id': patient_id, 'docType': 'C', 'visible': True})
        return Response(ConsultationSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class GetPrescriptionView(APIView):
    serializer_class = CreatePrescriptionSerializer
    def post(self, request, format=None):
        patient_id = request.data['id']
        documents = document_collection.find({'patient_id': patient_id, 'docType': 'P', 'visible': True})
        return Response(PrescriptionSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class GetPrescriptionBuyMedicineView(APIView):
    serializer_class = CreatePrescriptionSerializer
    def post(self, request, format=None):
        patient_id = request.data['id']
        documents = document_collection.find({'patient_id': patient_id, 'docType': 'P', 'visible': True, 'medicine_bought': False})
        return Response(PrescriptionSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class GetDoctorPrescriptionView(APIView):
    serializer_class = CreatePrescriptionSerializer
    def post(self, request, format=None):
        doctor_id = request.data['id']
        documents = document_collection.find({'doctor_id': doctor_id, 'docType': 'P'})
        return Response(PrescriptionSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class GetDoctorConsultationView(APIView):
    serializer_class = CreateConsultationSerializer
    def post(self, request, format=None):
        doctor_id = request.data['id']
        documents = document_collection.find({'doctor_id': doctor_id, 'docType': 'C', 'prescribed': False})
        return Response(ConsultationSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class CreateTestResultView(APIView):
    serializer_class = CreateTestResultSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            test_result = TestResult(prescription_id=request.data['prescription_id'], patient_id=request.data['patient_id'], hospital_name=request.data['hospital_name'], patient_name=request.data['patient_name'],  test=request.data['test'], test_result=request.data['test_result'], hospital_id=request.data['hospital_id'])
            document_collection.insert_one(TestResultSerializer(test_result).data)
            return Response(TestResultSerializer(test_result).data, status=status.HTTP_200_OK)

class GetTestResultView(APIView):
    serializer_class = CreateTestResultSerializer
    def post(self, request, format=None):
        patient_id = request.data['id']
        documents = document_collection.find({'patient_id': patient_id, 'docType': 'T', 'visible': True})
        return Response(TestResultSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class GetTestResultHospitalView(APIView):
    serializer_class = CreateTestResultSerializer
    def post(self, request, format=None):
        hospital_id = request.data['id']
        documents = document_collection.find({'hospital_id': hospital_id, 'docType': 'T', 'visible': True})
        return Response(TestResultSerializer(documents, many=True).data, status=status.HTTP_200_OK)

class CreateConsultationBillView(APIView):
    serializer_class = CreateConsultationBillSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            consultation_bill = ConsultationBill(consultation_id=request.data['consultation_id'], patient_id=request.data['patient_id'], doctor_id=request.data['doctor_id'], patient_name=request.data['patient_name'], doctor_name=request.data['doctor_name'], amount=request.data['amount'], insurance_id=request.data['insurance_id'], insurance_name=request.data['insurance_name'])
            patient_balance = user_collection.find_one({'id': request.data['patient_id']})['balance']
            if(int(patient_balance) < int(request.data['amount'])):
                return Response({'Bad Request': 'Insufficient Balance...'}, status=status.HTTP_400_BAD_REQUEST)
            user_collection.update_one({'id': request.data['patient_id']}, {'$set': {'balance': int(patient_balance) - int(request.data['amount'])}})
            doctor_balance = user_collection.find_one({'id': request.data['doctor_id']})['balance']
            user_collection.update_one({'id': request.data['doctor_id']}, {'$set': {'balance': int(doctor_balance) + int(request.data['amount'])}})
            document_collection.insert_one(ConsultationBillSerializer(consultation_bill).data)
            return Response(ConsultationBillSerializer(consultation_bill).data, status=status.HTTP_200_OK)

class CreateTestResultBillView(APIView):
    serializer_class = CreateTestResultBillSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            test_result_bill = TestResultBill(prescription_id=request.data['prescription_id'], patient_id=request.data['patient_id'], hospital_id=request.data['hospital_id'], patient_name=request.data['patient_name'], hospital_name=request.data['hospital_name'], amount=request.data['amount'], insurance_id=request.data['insurance_id'], insurance_name=request.data['insurance_name'], test=request.data['test'])
            patient_balance = user_collection.find_one({'id': request.data['patient_id']})['balance']
            if(int(patient_balance) < int(request.data['amount'])):
                return Response({'Bad Request': 'Insufficient Balance...'}, status=status.HTTP_400_BAD_REQUEST)
            user_collection.update_one({'id': request.data['patient_id']}, {'$set': {'balance': int(patient_balance) - int(request.data['amount'])}})
            hospital_balance = org_collection.find_one({'id': request.data['hospital_id']})['balance']
            org_collection.update_one({'id': request.data['hospital_id']}, {'$set': {'balance': int(hospital_balance) + int(request.data['amount'])}})
            document_collection.insert_one(TestResultBillSerializer(test_result_bill).data)
            return Response(TestResultBillSerializer(test_result_bill).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class CreatePharmacyBillView(APIView):
    def post(self, request, format=None):            
        pharmacy_bill = PharmacyBill(prescription_id=request.data['prescription_id'], patient_id=request.data['patient_id'], pharmacy_id=request.data['pharmacy_id'], patient_name=request.data['patient_name'], pharmacy_name=request.data['pharmacy_name'], amount=request.data['amount'], insurance_id=request.data['insurance_id'], insurance_name=request.data['insurance_name'], medicine=request.data['medicine'])
        patient_balance = user_collection.find_one({'id': request.data['patient_id']})['balance']
        if(int(patient_balance) < int(request.data['amount'])):
            return Response({'Bad Request': 'Insufficient Balance...'}, status=status.HTTP_400_BAD_REQUEST)
        user_collection.update_one({'id': request.data['patient_id']}, {'$set': {'balance': int(patient_balance) - int(request.data['amount'])}})
        pharmacy_balance = org_collection.find_one({'id': request.data['pharmacy_id']})['balance']
        org_collection  .update_one({'id': request.data['pharmacy_id']}, {'$set': {'balance': int(pharmacy_balance) + int(request.data['amount'])}})
        document_collection.insert_one(PharmacyBillSerializer(pharmacy_bill).data)
        
        pharmacy_order = PharmacyOrder(prescription_id=request.data['prescription_id'], patient_id=request.data['patient_id'], pharmacy_id=request.data['pharmacy_id'], patient_name=request.data['patient_name'], pharmacy_name=request.data['pharmacy_name'], medicine=request.data['medicine'], amount=request.data['amount'])
        print(pharmacy_order)
        document_collection.insert_one(PharmacyOrderSerializer(pharmacy_order).data)
        return Response(PharmacyBillSerializer(pharmacy_bill).data, status=status.HTTP_200_OK)

class GetPharmacyOrderView(APIView):
    def post(self, request, format=None):
        pharmacy_order = document_collection.find_one({'pharmacy_id': request.data['id'],'docType':'O'})
        return Response(pharmacy_order, status=status.HTTP_200_OK)

class GetUserPharmacyOrderView(APIView):
    def post(self, request, format=None):
        pharmacy_order = document_collection.find_one({'patient_id': request.data['id'],'docType':'O'})
        return Response(pharmacy_order, status=status.HTTP_200_OK)

class PharmacyDeliverOrderView(APIView):
    def post(self, request, format=None):
        document_collection.update_one({'id': request.data['id']}, {'$set': {'delivered': 'Delivered'}})
        return Response({'Success': 'Order Delivered...'}, status=status.HTTP_200_OK)

class ClaimRefundView(APIView):
    def post(self, request, format=None):
        patient_id = request.data['patient_id']
        insurance_id = request.data['insurance_id']
        refund = request.data['refund_amount']
        bill_id = request.data['bill_id']
        document_collection.update_one({'id': bill_id}, {'$set': {'claimed': True}})
        patient_balance = user_collection.find_one({'id': patient_id})['balance']
        user_collection.update_one({'id': patient_id}, {'$set': {'balance': int(patient_balance) + int(refund)}})
        insurance_balance = org_collection.find_one({'id': insurance_id})['balance']
        org_collection.update_one({'id': insurance_id}, {'$set': {'balance': int(insurance_balance) - int(refund)}})
        return Response({'Success': 'Refund Claimed...'}, status=status.HTTP_200_OK)

class GetClaimView(APIView):
    def post(self, request, format=None):
        claim = document_collection.find({'patient_id': request.data['id'], 'docType': {'$regex':"B"},'claimed':True})
        return Response(claim, status=status.HTTP_200_OK)

class GetHospitalDoctorsView(APIView):
    def post(self, request, format=None):
        hospital_id = request.data['id']
        doctors = []
        for doctor in user_collection.find({'userType': 'D'}):
            if(doctor['hospital'] == hospital_id):
                doctors.append(DoctorSerializer(doctor).data)
        return Response(DoctorSerializer(doctors, many=True).data, status=status.HTTP_200_OK)