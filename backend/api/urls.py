from django.urls import path
from  .views import *

urlpatterns = [
    path('create-user/', CreateUserView.as_view(), name="create-user"),
    path('create-organization/', CreateOrganizationView.as_view(), name="create-organization"),
    path('get-check-users/', GetCheckUsersView.as_view(), name="get-check-users"),
    path('get-check-organizations/', GetCheckOrganizationsView.as_view(), name="get-check-organizations"),
    path('get-users/', GetUsersView.as_view(), name="get-users"),
    path('get-user/', GetUserView.as_view(), name="get-user"),
    path('update-user/', UpdateUserView.as_view(), name="update-user"),
    path('get-organizations/', GetOrganizationsView.as_view(), name="get-organizations"),
    path('get-organization/', GetOrganizationView.as_view(), name="get-organization"),
    path('update-organization/', UpdateOrganizationView.as_view(), name="update-organization"),
    path('get-hospitals/', GetHospitalsView.as_view(), name="get-hospitals"),
    path('get-doctors/', GetDoctorsView.as_view(), name="get-doctors"),
    path('get-patients/', GetPatientsView.as_view(), name="get-patients"),
    path('get-insurance-companies/', GetInsuranceView.as_view(), name="get-insurance-companies"),
    path('get-pharmacies/', GetPharmaciesView.as_view(), name="get-pharmacies"),
    path('approve-user/', ApproveUserView.as_view(), name="approve-user"),
    path('approve-organization/', ApproveOrganizationView.as_view(), name="approve-organization"),
    path('login-user/', LoginUserView.as_view(), name="login-user"),
    path('login-organization/', LoginOrganizationView.as_view(), name="login-organization"),
    path('reject-user/', RejectUserView.as_view(), name="reject-user"),
    path('reject-organization/', RejectOrganizationView.as_view(), name="reject-organization"),
    path('delete-user/', DeleteUserView.as_view(), name="delete-user"),
    path('delete-organization/', DeleteOrganizationView.as_view(), name="delete-organization"),
    path('get-otp/', GetOTPView.as_view(), name="get-otp"),
    
]
