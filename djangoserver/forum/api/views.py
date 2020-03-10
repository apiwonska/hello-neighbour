from rest_framework import filters, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication

from forum.models import Category, Thread, Post
from users.models import CustomUser
from .serializers import (
    CategorySerializer,
    ThreadSerializer,
    PostSerializer,
)
from .permissions import IsOwnerOrReadOnly

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """Allowed methods: get, head, options.

    Routes:
    GET /categories
    GET /categories/1
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    authentication_classes = [TokenAuthentication]


class ThreadViewSet(viewsets.ModelViewSet):
    """A class based view with custom create and patch methods. 
    Allowed http methods: get, post, patch, head, options. Delete http method is not allowed.
    User can update only threads, that belong to them.

    Routes:
    GET /threads
    GET /threads/?category=1
    GET /threads/?search=xyz
    GET /threads/?ordering=created
    GET /threads/1
    POST /threads
    PATCH /threads/1

    Ordering is possible by 'created' or 'latest_post_time'. Default ordering is from the latest posts. 
    """
    serializer_class = ThreadSerializer
    http_method_names = ['get', 'post', 'patch', 'head', 'options']
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'subject']
    ordering_fields = ['created', 'latest_post_time']
    ordering=('-created',)
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        """Custom get_queryset method. If 'category' key is passed in request params, the method returns thread objects related to the category. By default the method returns all thread objects.
        """
        category_id = self.request.query_params.get('category', None)
        if category_id:
            queryset = Thread.objects.filter(category__id=category_id)
        else:
            queryset = Thread.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        """Custom create method automatically saves authenticated user in user field. 
        The method will save only "title", "subject", "user" and "category" properties. It makes impossible to save other properties ("closed", "sticky"), that are meant to be changed only by admin by admin panel.
        """
        try:
            Category.objects.get(id=request.data['category'])
        except Category.DoesNotExist:
            return Response({"category": [f"Category object id \"{request.data['category']}\" does not exist"]}, status=status.HTTP_400_BAD_REQUEST)
        data = {}
        data['title'] = request.data['title']
        data['subject'] = request.data['subject']
        data['user'] = request.user.id
        data['category'] = request.data['category']

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def partial_update(self, request, *args, **kwargs):
        """Custom partial_update method allowes to modify only title and subject properies.
        User can only update threads, that belong to them.
        """        
        instance = self.get_object()
        data = {}
        data['title'] = request.data.get('title', instance.title)
        data['subject'] = request.data.get('subject', instance.subject)

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)


class PostViewSet(viewsets.ModelViewSet):
    """A class based view with custom create and patch methods. 
    Allowed http methods: get, post, patch, delete, head, options.
    User can update and delete only posts, that belong to them.

    Routes:
    GET /posts
    GET /posts/?user=1
    GET /posts/?search=xyz
    GET /posts/?ordering=created
    GET /posts/1
    POST /posts
    PATCH /posts/1
    DELETE /posts/1

    Ordering is possible by 'created' field. Default ordering is from the oldest posts. 
    
    """
    serializer_class = PostSerializer
    http_method_names = ['get', 'post', 'patch', 'delete', 'head', 'options']
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['content']
    ordering_fields = ['created']
    ordering=('created',)
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        """Custom get_queryset method. If 'user' key is passed in request params, the method returns thread objects related to the category. By default the method returns all thread objects.
        """
        user_id = self.request.query_params.get('user', None)
        if user_id:
            queryset = Post.objects.filter(user__id=user_id)
        else:
            queryset = Post.objects.all()
        return queryset
    
    def create(self, request, *args, **kwargs):
        """Custom create method automatically saves authenticated user in user field. 
        """
        try:
            Thread.objects.get(id=request.data['thread'])
        except Thread.DoesNotExist:
            return Response({"thread": [f"Thread object id \"{request.data['thread']}\" does not exist"]}, status=status.HTTP_400_BAD_REQUEST)
        data = {}
        data['content'] = request.data['content']
        data['user'] = request.user.id
        data['thread'] = request.data['thread']

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def partial_update(self, request, *args, **kwargs):
        """Custom partial_update method allows to modify only content property. The purpose of this custom method is to prevent changing user and thread fields.
        """
        instance = self.get_object()
        data = {}
        data['content'] = request.data.get('content', instance.content)

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        """Custom delete method allows user to delete their own posts only."""
        post = self.get_object()
        post.delete()
        return Response({"detail": "Object deleted"}, status=status.HTTP_204_NO_CONTENT)
