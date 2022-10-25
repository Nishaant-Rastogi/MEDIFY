from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer, CreateUserSerializer
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer  

class CreateUserView(APIView):
    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
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
            querySet = User.objects.filter(email=email)
            if querySet.exists():
                return Response({'email': 'Email is already in use'}, status=status.HTTP_400_BAD_REQUEST)
            user = User(name=name, dob=dob, gender=gender, address=address, phoneNo=phoneNo, aadharNo=aadharNo, userType=userType, email=email, password=password)
            user.save()

            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
