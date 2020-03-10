from rest_framework.response import Response
from rest_framework import filters, status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

from users.models import CustomUser
from .serializers import UserPublicSerializer, UserPrivateSerializer, RegistrationSerializer
from .permissions import IsOwnerOrReadOnly

class RegistrationViewSet(viewsets.ModelViewSet):
    """Allowed http methods: post. For registering a user, the data have to contain `username`, `email`, `password` and `password2` fields.

    Routes:
    POST /registration/
    """
    serializer_class = RegistrationSerializer
    http_method_names = ['post']
    permission_classes = [AllowAny]


class UserViewSet(viewsets.ModelViewSet):
    """Allowed http methods: get, patch, head, options.
    Some user data are accessible only for profile owner and hidden from other users.
    User can update only their own profile data.

    Routes:
    GET /users/
    GET /users/?search=some_name
    GET /users/1/
    POST /users/
    PATCH /users/1/

    Ordering is alphabetical. 
    """
    queryset = CustomUser.objects.exclude(username='user_deleted')
    serializer_class = UserPublicSerializer
    http_method_names = ['get', 'patch', 'head', 'options']
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def retrieve(self, request, *args, **kwargs):
        """Custom retrieve method use UserPrivateSerializer if the user object is requested by it's owner.
        """
        instance = self.get_object()
        if request.user == instance:
            serializer = UserPrivateSerializer(instance)
        else:
            serializer = UserPublicSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        """Custom partial_update method allows to modify only selected fields.
        """

        instance = self.get_object()
        data ={}
        data['status'] = request.data.get('status', instance.status)
        data['description'] = request.data.get('description', instance.description)
        data['email'] = request.data.get('email', instance.email)
        
        serializer = UserPrivateSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
