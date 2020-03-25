from rest_framework import test

from users.api.serializers import (ChangePasswordSerializer,
                                   RegistrationSerializer,
                                   UserPrivateSerializer, UserPublicSerializer)
from users.models import CustomUser


class UserTestCase(test.APITestCase):
    
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user_attrs = {
            'username': 'testUser',
            'email': 'user@test.pl',
            'password': 'p@ssword123',
            'status': 'user status',
            'description': 'user description'
        }
        cls.user = CustomUser.objects.create_user(**cls.user_attrs)

class UserPublicSerializerTestCase(UserTestCase):

    def test_contains_expected_fields(self):
        """Ensure that all expected fields are contained in data"""
        self.serializer = UserPublicSerializer(instance=self.user)
        data = self.serializer.data
        fields = ['id', 'username', 'date_joined', 'status', 'description', 'avatar']
        self.assertCountEqual(data.keys(), fields)

class UserPrivateSerializerTestCase(UserTestCase):

    def test_contains_expected_fields(self):
        """Ensure that all expected fields are contained in data"""
        self.serializer = UserPrivateSerializer(instance=self.user)
        data = self.serializer.data
        fields = ['id', 'username', 'email', 'date_joined', 'status', 'description', 'avatar']
        self.assertCountEqual(data.keys(), fields)

class RegistrationSerializerTestCase(UserTestCase):

    def setUp(self):
        self.correct_data = {
            'username': 'NewTestUser', 
            'email': 'new.user@test.com',
            'password': 'p@ssword123',
            'password2': 'p@ssword123'
        }

    def test_creates_user(self):
        """
        Ensure a new user is created in deserialization.
        """
        serializer = RegistrationSerializer(data=self.correct_data)
        serializer.is_valid()
        serializer.save()
        self.assertTrue(CustomUser.objects.get(username='NewTestUser'))

    def test_password_is_not_in_data(self):
        """
        Ensure password field is not in serializer.data.
        """
        serializer = RegistrationSerializer(data=self.correct_data)
        serializer.is_valid()
        self.assertEqual(serializer.data, {'username': 'NewTestUser', 'email': 'new.user@test.com'})

    def test_validate_email_unique(self):
        data = self.correct_data
        data['email'] = self.user.email
        serializer = RegistrationSerializer(data = data)
        is_valid = serializer.is_valid()
        self.assertFalse(is_valid)
        self.assertEqual(str(serializer.errors['email'][0]), 'This field must be unique.')

    def test_email_required(self):
        data = self.correct_data
        del data['email']
        serializer = RegistrationSerializer(data = data)
        is_valid = serializer.is_valid()
        self.assertFalse(is_valid)
        self.assertEqual(str(serializer.errors['email'][0]), 'This field is required.')

    def test_validate_username_length(self):
        """
        Ensure that the password can't be shorter than 3 characters.
        """
        data = self.correct_data
        data['username'] = 'qw'
        serializer = RegistrationSerializer(data = data)
        is_valid = serializer.is_valid()
        self.assertFalse(is_valid)
        self.assertEqual(str(serializer.errors['username'][0]), 'Username must be at least 3 characters length.')

        data['username'] = 'qwe'
        serializer = RegistrationSerializer(data = data)
        is_valid = serializer.is_valid()
        self.assertTrue(is_valid)
    
    def test_password_confirmed_correctly(self):
        """
        Ensure that the data is not validated if passwords don't match.
        """
        data = self.correct_data
        data['password2'] = 'password'
        serializer = RegistrationSerializer(data = data)
        is_valid = serializer.is_valid()
        self.assertFalse(is_valid)
        self.assertEqual(str(serializer.errors['password'][0]), 'Passwords must match.')