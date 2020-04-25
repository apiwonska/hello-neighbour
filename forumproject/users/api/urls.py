from django.urls import include, path
# from rest_framework.authtoken.views import ObtainAuthToken

from users.api.views import CustomObtainAuthToken, ChangePasswordView


urlpatterns = [
    path('token-auth/', CustomObtainAuthToken.as_view(), name='auth'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('password-reset/', include('django_rest_passwordreset.urls', namespace='password_reset'))
]
