from django.urls import path
from  .views import CreateUserView, CreateOrganizationView

urlpatterns = [
    path('create-user/', CreateUserView.as_view(), name="create-user"),
    path('create-organization/', CreateOrganizationView.as_view(), name="create-organization"),
]
