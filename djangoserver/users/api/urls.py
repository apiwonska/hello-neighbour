from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

from users.api.views import (
    ChangePasswordView,
    )


urlpatterns = [
    path('token-auth/', obtain_auth_token),
    path('change-password/', ChangePasswordView.as_view()),
]