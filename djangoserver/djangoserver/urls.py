from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from forum.api.views import (
    CategoryViewSet,
    ThreadViewSet,
    PostViewSet
    )
from users.api.views import (
    UserViewSet, 
    RegistrationViewSet,
    ChangePasswordView
    )


# Regiter REST FRAMEWORK routers
router = routers.DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('threads', ThreadViewSet, basename='thread')
router.register('posts', PostViewSet, basename='post')
router.register('users', UserViewSet, basename='user')
router.register('registration', RegistrationViewSet, basename='registration')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token-auth/', obtain_auth_token),
    path('api/change-password/', ChangePasswordView.as_view()),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

