from rest_framework import serializers

from users.models import CustomUser


class UserPublicSerializer(serializers.ModelSerializer):
    """Serialize user data that is meant to be visible to other users.
    """
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'date_joined', 'status', 'description']

class UserPrivateSerializer(serializers.ModelSerializer):
    """Serialize user data that is meant to be visible only to a profile owner.
    """
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined', 'status', 'description']