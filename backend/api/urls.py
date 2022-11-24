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
    path('login-admin/', LoginAdminView.as_view(), name="login-admin"),
    path('reject-user/', RejectUserView.as_view(), name="reject-user"),
    path('reject-organization/', RejectOrganizationView.as_view(), name="reject-organization"),
    path('delete-user/', DeleteUserView.as_view(), name="delete-user"),
    path('delete-organization/', DeleteOrganizationView.as_view(), name="delete-organization"),
    path('request-consultation/', CreateConsultationView.as_view(), name="consultation"),
    path('get-consultations/', GetConsultationView.as_view(), name="get-consultations"),
    path('get-prescriptions/', GetPrescriptionView.as_view(), name="get-prescriptions"),
    path('get-test-results/', GetTestResultView.as_view(), name="get-test-results"),
    path('get-hospital-tests/', GetTestResultHospitalView.as_view(), name="get-hospital-tests"),
    path('send-test-result/', CreateTestResultView.as_view(), name="send-test-result"),
    path('get-bills/', GetBillView.as_view(), name="get-bills"),
    path('get-unclaim-bills/', GetUnClaimBillView.as_view(), name="get-unclaim-bills"),
    path('get-hospital-bills/', GetHospitalBillView.as_view(), name="get-hospital-bills"),
    path('get-hospital-doctors/', GetHospitalDoctorsView.as_view(), name="get-hospital-doctors"),
    path('get-doctor-bills/', GetDoctorBillView.as_view(), name="get-doctor-bills"),
    path('get-pharmacy-bills/', GetPharmacyBillView.as_view(), name="get-insurance-bills"),
    path('get-doctor-prescriptions/', GetDoctorPrescriptionView.as_view(), name="get-doctor-prescriptions"),
    path('get-doctor-consultations/', GetDoctorConsultationView.as_view(), name="get-doctor-test-results"),
    path('send-prescription/', CreatePrescriptionView.as_view(), name="send-prescription"),
    path('update-consultation-view/', UpdateConsultationView.as_view(), name="update-consultation"),
    path('update-prescription-view/', UpdatePrescriptionView.as_view(), name="update-prescription"),
    path('update-test-result-view/', UpdateTestResultView.as_view(), name="update-test-result"),
    path('update-bill-view/', UpdateBillView.as_view(), name="update-bill"),
    path('send-consultation-bill/', CreateConsultationBillView.as_view(), name="send-consultation-bill"),
    path('send-pharmacy-bill/', CreatePharmacyBillView.as_view(), name="send-pharmacy-bill"),
    path('send-test-result-bill/', CreateTestResultBillView.as_view(), name="send-test-bill"),
    path('claim-refund/', ClaimRefundView.as_view(), name="claim-refund"),
    path('get-prescriptions-buy-medicine/', GetPrescriptionBuyMedicineView.as_view(), name="get-prescriptions-buy-medicine"),
    path('get-user-pharmacy-orders/', GetUserPharmacyOrderView.as_view(), name="get-pharmacy-orders"),
    path('get-pharmacy-orders/', GetPharmacyOrderView.as_view(), name="get-pharmacy-order"),
    path('get-claims/', GetClaimView.as_view(), name="get-claims"),
    path('verify/', VerifyView.as_view(), name="verify"),
    path('get-aadhar/', GetAadharView.as_view(), name="get-aadhar"),
    path('get-license/', GetLicenseView.as_view(), name="get-license"),
    path('get-email/', GetEmailView.as_view(), name="get-email"),
    path('add-block/', AddBlockView.as_view(), name="add-block"),
    path('get-blocks/', GetBlocksView.as_view(), name="get-blocks"),
    path('get-insurance-bills/', GetInsuranceBillView.as_view(), name="get-insurance-bills"),
]
