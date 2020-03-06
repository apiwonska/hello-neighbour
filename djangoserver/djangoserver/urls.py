from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from forum.api.views import (
    CategoryViewSet,
    ThreadViewSet,
    PostViewSet,    
)


# Regiter REST FRAMEWORK routers
router = routers.DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('threads', ThreadViewSet, basename='thread')
router.register('posts', PostViewSet, basename='post')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token),
    path('admin/', admin.site.urls),
]
