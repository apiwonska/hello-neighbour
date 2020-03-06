from rest_framework import filters, status, viewsets
from rest_framework.response import Response
# from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import AllowAny

from forum.models import Category, Thread, Post
from users.models import CustomUser
from .serializers import (
    CategorySerializer,
    ThreadSerializer,
    PostSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """Allowed methods: get, head, options.

    Routes:
    GET /categories
    GET /categories/1
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # http_method_names = ['get', 'head', 'options']
    # authentication_classes = [TokenAuthentication]


class ThreadViewSet(viewsets.ModelViewSet):
    """A class based view with custom create and patch methods. 
    Allowed http methods: get, post, patch, head, options. Delete http method is not allowed.

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
    # authentication_classes = [TokenAuthentication]

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
        """Custom create method, that will save only title, subject, user and category properties.
        """
        data = request.data
        thread = Thread.objects.create(
            title=data['title'],
            subject=data['subject'],
            user = CustomUser.objects.get(id=data['user']),
            category = Category.objects.get(id=data['category'])
        )        
        thread.save()
        serializer = ThreadSerializer(thread)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def partial_update(self, request, *args, **kwargs):
        """Custom partial_update method allowes to modify only title and subject properies.
        """
        thread = self.get_object()
        data = request.data
        thread.title = data.get('title', thread.title)
        thread.subject = data.get('subject', thread.subject)
        thread.save()
        serializer = ThreadSerializer(thread)
        return Response(serializer.data)


class PostViewSet(viewsets.ModelViewSet):
    """A class based view with custom create and patch methods. 
    Allowed http methods: get, post, patch, delete, head, options.

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
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [AllowAny]

    def get_queryset(self):
        """Custom get_queryset method. If 'user' key is passed in request params, the method returns thread objects related to the category. By default the method returns all thread objects.
        """
        user_id = self.request.query_params.get('user', None)
        if user_id:
            queryset = Post.objects.filter(user__id=user_id)
        else:
            queryset = Post.objects.all()
        return queryset
    
    def partial_update(self, request, *args, **kwargs):
        """Custom partial_update method allows to modify only content property. The purpose of this custom method is to prevent changing user and thread fields.
        """
        post = self.get_object()
        data = request.data
        post.content = data.get('content', post.content)
        post.save()
        serializer = PostSerializer(post)
        return Response(serializer.data)

