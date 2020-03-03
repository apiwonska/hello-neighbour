from django.urls import path

from .api.views import (
    CategoryViewSet,
    ThreadViewSet,
    PostViewSet,
)

urlpatterns = [
    path('categories/', CategoryViewSet.as_view(), name='category_list'),
    path('threads/', ThreadViewSet.as_view(), name='thread_list'),
    path('posts/', PostsViewSet.as_view(), name='posts_list'),
]