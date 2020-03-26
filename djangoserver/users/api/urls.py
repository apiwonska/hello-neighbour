from django.urls import include, path
from rest_framework.authtoken import views

from users.api.views import ChangePasswordView

urlpatterns = [
    path('token-auth/', views.obtain_auth_token, name='auth'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
]
