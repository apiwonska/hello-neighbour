from django.contrib.auth import password_validation
from django.core import exceptions
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from users.models import CustomUser


class UserPublicSerializer(serializers.ModelSerializer):
    """Serialize user data that is meant to be visible to other users.
    """

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'date_joined', 'status', 'description', 'avatar']


class UserPrivateSerializer(serializers.ModelSerializer):
    """Serialize user data that is meant to be visible only to a profile owner.
    """
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=CustomUser.objects.all())])

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'date_joined', 'status', 'description', 'avatar']


class RegistrationSerializer(serializers.ModelSerializer):
    """Serializer for registering a new users.
    """
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=CustomUser.objects.all())])
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'email', 'password2']
        # Hide the password
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def validate_username(self, value):
        if len(value) < 3:
            raise serializers.ValidationError('Username must be at least 3 characters length.')
        return value

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
            password_validation.validate_password(password=password, user=user)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        if errors:
            raise serializers.ValidationError(errors)
        return super().validate(data)

    def save(self):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if  password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        else:
            user = CustomUser(
                username = self.validated_data['username'],
                email = self.validated_data['email']
            )
            user.set_password(password)
            user.save()
            return user


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for changing the password.
    Checks if the `old_password` match with old user password.
    Checks if the new password meets security criteria.
    Checks if `password2` matches with `password`.
    """
    model = CustomUser
    old_password = serializers.CharField(style={'input_type': 'password'}, write_only=True, required=True)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True, required=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True, required=True)
    
    def validate_password(self, value):
        password_validation.validate_password(value, self.instance)
        return value
    
    def validate_old_password(self, value):
        if not self.instance.check_password(value):
            raise serializers.ValidationError('Wrong password.')
        return value

    def save(self):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if  password != password2:
            raise serializers.ValidationError('Passwords must match.')
        else:
            self.instance.set_password(password)
            self.instance.save()
            return self.instance
