from rest_framework.response import Response
from rest_framework import filters, status, viewsets
from rest_framework.authentication import TokenAuthentication

from users.models import CustomUser
from .serializers import UserPublicSerializer, UserPrivateSerializer


class UserViewSet(viewsets.ModelViewSet):
    """A class based view. 
    Allowed http methods: get, patch, head, options.
    Some user data are accessible only for profile owner and hidden from other users.
    User can update only their own profile data.

    Routes:
    GET /users
    GET /users/?search=some_name
    GET /users/1
    POST /users
    PATCH /users/1

    Ordering is alphabetical. 
    """
    queryset = CustomUser.objects.exclude(username='user_deleted')
    serializer_class = UserPublicSerializer
    http_method_names = ['get', 'patch', 'head', 'options']
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']
    authentication_classes = [TokenAuthentication]

    def retrieve(self, request, *args, **kwargs):
        """Custom retrieve method use UserPrivateSerializer if the user object is requested by it's owner.
        """
        user = self.get_object()
        if request.user == user:
            serializer = UserPrivateSerializer(user)
        else:
            serializer = UserPublicSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        """Custom partial_update method allows to modify only selected fields.
        """
        user = self.get_object()
        if request.user == user:
            data = request.data
            user.status = data.get('status', user.status)
            user.description = data.get('description', user.description)
            user.email = data.get('email', user.email)
            user.save()
            serializer = UserPrivateSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "Action not permitted"}, status=status.HTTP_401_UNAUTHORIZED)

