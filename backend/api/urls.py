from django.urls import path
from  .views import *

urlpatterns = [
    path('create-user/', CreateUserView.as_view(), name="create-user"),
    path('create-organization/', CreateOrganizationView.as_view(), name="create-organization"),
    path('get-check-users/', GetCheckUsersView.as_view(), name="get-check-users"),
    path('get-check-organizations/', GetCheckOrganizationsView.as_view(), name="get-check-organizations"),
    path('get-users/', GetUsersView.as_view(), name="get-users"),
    path('get-organizations/', GetOrganizationsView.as_view(), name="get-organizations"),
    path('approve-user/', ApproveUserView.as_view(), name="approve-user"),
    path('approve-organization/', ApproveOrganizationView.as_view(), name="approve-organization"),
    path('login-user/', LoginUserView.as_view(), name="login-user"),
    path('login-organization/', LoginOrganizationView.as_view(), name="login-organization"),
    path('reject-user/', RejectUserView.as_view(), name="reject-user"),
    path('reject-organization/', RejectOrganizationView.as_view(), name="reject-organization"),
]
