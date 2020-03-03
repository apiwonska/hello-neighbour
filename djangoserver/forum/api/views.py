from rest_framework import filters, response, status, viewsets
from rest_framework.response import Response

from forum.models import Category, Thread, Post
from users.models import CustomUser
from .serializers import (
    CategorySerializer,
    ThreadSerializer,
    PostSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


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

    Ordering is possible by 'created' or 'latest_post_time'
    """
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    http_method_names = ['get', 'post', 'patch', 'head', 'options']
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'subject']
    ordering_fields = ['created', 'latest_post_time']
    ordering=('-created',)

    def get_queryset(self):
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
    # """A class based view with custom create and patch methods. 
    # Allowed http methods: get, post, patch, head, options. Delete http method is not allowed.

    # Routes:
    # GET /threads
    # GET /threads/?category=1
    # GET /threads/?search=xyz
    # GET /threads/?ordering=created
    # GET /threads/1
    # POST /threads
    # PATCH /threads/1

    # Ordering is possible by 'created' or 'latest_post_time'
    
    # """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # POST 
    # PATCH allow to change content only
    # DELETE
