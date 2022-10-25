from django.urls import path
from  .views import index

urlpatterns = [
    path('', index),
    path('signup', index),  
    path('verification', index),

    path('admin_user/home', index),
    path('admin_user/users', index),
    path('admin_user/organisations', index),
    path('admin_user/users_list', index ),
    path('admin_user/organisations_list', index ),
    
    path('user/patients/home', index),
    path('user/patients/hospital', index),
    path('user/patients/doctor', index),
    path('user/patients/insurance', index),
    path('user/patients/pharmacy', index),
    path('user/patients/upload', index),
    path('user/patients/consultation', index),
    path('user/patients/prescription', index),
    path('user/patients/tests', index),
    path('user/patients/records', index),
    path('user/patients/bills', index),
    path('user/patients/claim', index),

    path('user/doctors/home', index),
    path('user/doctors/patients', index),
    path('user/doctors/prescriptions', index),
    path('user/doctors/consultations', index),
    path('user/doctors/upload', index),

    path('organisation/hospitals/home', index),
    path('organisation/hospitals/tests', index),
    path('organisation/hospitals/bills', index),
    path('organisation/hospitals/doctors', index),

    path('organisation/insurance/home', index),
    path('organisation/insurance/patients', index),
    path('organisation/insurance/bills', index),
    path('organisation/insurance/claims', index),

    path('organisation/pharmacy/home', index),
    path('organisation/pharmacy/orders', index),
    path('organisation/pharmacy/bills', index),
    path('organisation/pharmacy/inventory', index),
]
