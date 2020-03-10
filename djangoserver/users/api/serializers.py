from django.core import exceptions
from django.contrib.auth import password_validation as validators
from rest_framework import serializers

from users.models import CustomUser

class RegistrationSerializer(serializers.ModelSerializer):
    """Serializer for registering a new users.
    """
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'email', 'password2']
        # Hide the password
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def validate(self, data):
        # here data has all the fields which have validated values
        # so we can create a User instance out of it
        user = CustomUser(
            username=data['username'],
            email=data['email'],
            password=data['password']
            )
        password = data.get('password')
        errors = {} 
        try:
            validators.validate_password(password=password, user=user)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        if errors:
            raise serializers.ValidationError(errors)
        return super().validate(data)

    def save(self):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if  password != password2:
            raise serializers.ValidationError({"password": "Passwords must match."})
        else:
            user = CustomUser(
                username = self.validated_data['username'],
                email = self.validated_data['email']
            )
            user.set_password(password)
            user.save()
            return user


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
    
    def validate(self, data):
        # here data has all the fields which have validated values
        # so we can create a User instance out of it
        user = CustomUser(
            username=data['username'],
            email=data['email'],
            password=data['password']
            )
        password = data.get('password')
        errors = {} 
        try:
            validators.validate_password(password=password, user=user)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        if errors:
            raise serializers.ValidationError(errors)
        return super().validate(data)
