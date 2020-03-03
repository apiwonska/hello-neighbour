from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from forum.api.views import (
    CategoryViewSet,
    ThreadViewSet,
    PostViewSet,
)

# Regiter routers
router = routers.DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('threads', ThreadViewSet, basename='thread')
router.register('posts', PostViewSet, basename='post')

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
]
