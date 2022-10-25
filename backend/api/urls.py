from django.urls import path
from  .views import CreateUserView, CreateOrganizationView, GetCheckUsersView, GetCheckOrganizationsView

urlpatterns = [
    path('create-user/', CreateUserView.as_view(), name="create-user"),
    path('create-organization/', CreateOrganizationView.as_view(), name="create-organization"),
    path('get-check-users/', GetCheckUsersView.as_view(), name="get-check-users"),
    path('get-check-organizations/', GetCheckOrganizationsView.as_view(), name="get-check-organizations"),
]
