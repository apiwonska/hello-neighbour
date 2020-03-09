from rest_framework import filters, status, viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication

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
        data = request.data
        try:
            category = Category.objects.get(id=data['category'])
        except Category.DoesNotExist:
            return Response({"category": f"Category object id \"{data['category']}\" does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        thread = Thread.objects.create(
            title=data['title'],
            subject=data['subject'],
            user = request.user,
            category = category
        )
        thread.save()
        serializer = ThreadSerializer(thread)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def partial_update(self, request, *args, **kwargs):
        """Custom partial_update method allowes to modify only title and subject properies.
        User can only update threads, that belong to them.
        """
        thread = self.get_object()
        if request.user == thread.user:
            data = request.data
            thread.title = data.get('title', thread.title)
            thread.subject = data.get('subject', thread.subject)
            thread.save()
            serializer = ThreadSerializer(thread)
            return Response(serializer.data)
        return Response({"detail": "Action not permitted"}, status=status.HTTP_401_UNAUTHORIZED)


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
        data = request.data
        try:
            thread = Thread.objects.get(id=data['thread'])
        except Thread.DoesNotExist:
            return Response({"thread": f"Thread object id \"{data['thread']}\" does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        post = Post.objects.create(
            content=data['content'],
            user = request.user,
            thread = thread
        )
        post.save()
        serializer = PostSerializer(post)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def partial_update(self, request, *args, **kwargs):
        """Custom partial_update method allows to modify only content property. The purpose of this custom method is to prevent changing user and thread fields.
        """
        post = self.get_object()
        if request.user == post.user:
            data = request.data
            post.content = data.get('content', post.content)
            post.save()
            serializer = PostSerializer(post)
            return Response(serializer.data)
        return Response({"detail": "Action not permitted"}, status=status.HTTP_401_UNAUTHORIZED)
    
    def destroy(self, request, *args, **kwargs):
        """Custom delete method allows user to delete their own posts only."""
        post = self.get_object()
        if request.user == post.user:
            post.delete()
            return Response({"detail": "Object deleted"}, status=status.HTTP_204_NO_CONTENT)
        return Response({"detail": "Action not permitted"}, status=status.HTTP_401_UNAUTHORIZED)
