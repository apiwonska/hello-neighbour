from django.contrib.auth import password_validation
from rest_framework import test

from users.api.serializers import (ChangePasswordSerializer,
                                   RegistrationSerializer,
                                   UserPrivateSerializer, UserPublicSerializer)
from users.models import CustomUser


class BaseSerializerTestCase(test.APITestCase):
    
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

class UserPublicSerializerTestCase(BaseSerializerTestCase):

    def test_contains_expected_fields(self):
        """Ensure that all expected fields are contained in data"""
        self.serializer = UserPublicSerializer(instance=self.user)
        data = self.serializer.data
        fields = ['id', 'username', 'date_joined', 'status', 'description', 'avatar']
        self.assertCountEqual(data.keys(), fields)

class UserPrivateSerializerTestCase(BaseSerializerTestCase):

    def test_contains_expected_fields(self):
        """Ensure that all expected fields are contained in data"""
        self.serializer = UserPrivateSerializer(instance=self.user)
        data = self.serializer.data
        fields = ['id', 'username', 'email', 'date_joined', 'status', 'description', 'avatar']
        self.assertCountEqual(data.keys(), fields)

class RegistrationSerializerTestCase(BaseSerializerTestCase):

    def setUp(self):
        self.correct_data = {
            'username': 'NewTestUser', 
            'email': 'new.user@test.com',
            'password': 'p@ssword123',
            'password2': 'p@ssword123'
        }

    def test_create_user(self):
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
        """
        Ensure that the email value is unique.
        """
        data = self.correct_data
        data['email'] = self.user.email
        serializer = RegistrationSerializer(data = data)
        is_valid = serializer.is_valid()
        self.assertFalse(is_valid)
        self.assertEqual(str(serializer.errors['email'][0]), 'This field must be unique.')

    def test_email_required(self):
        """
        Ensure that the email is provided.
        """
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
    
    def test_raise_error_when_passwords_dont_match(self):
        """
        Ensure that the data is not validated if passwords don't match.
        """
        data = self.correct_data
        data['password2'] = 'password'
        serializer = RegistrationSerializer(data = data)
        is_valid = serializer.is_valid()
        self.assertFalse(is_valid)
        self.assertEqual(str(serializer.errors['password2'][0]), 'Passwords must match.')

    def test_raise_error_when_password_is_not_valid(self):
        """
        Ensure that error is raised when password is not valid.
        """
        data = self.correct_data
        data['password'] = 'password'
        data['password2'] = 'password'
        serializer = RegistrationSerializer(data = data)
        is_valid = serializer.is_valid()
        self.assertFalse(is_valid)
        self.assertEqual(str(serializer.errors['password'][0]), 'This password is too common.')

class ChangePasswordSerializerTestCase(BaseSerializerTestCase):

    def setUp(self):
        self.correct_data = {
            'old_password': 'p@ssword123',
            'password': 'p@ssword1234',
            'password2': 'p@ssword1234'
        }

    def test_updates_user_password(self):
        """
        Ensure users password is updated after saving serializer object.
        """
        serializer = ChangePasswordSerializer(instance=self.user, data=self.correct_data, partial=True)
        is_valid = serializer.is_valid()        
        serializer.save()
        password = self.correct_data['password']
        self.assertTrue(is_valid)
        self.assertTrue(self.user.check_password(password))

    def test_raise_error_when_passwords_dont_match(self):
        """
        Ensure that the data is not validated if passwords don't match.
        """
        data = self.correct_data
        data['password2'] = 'password'
        serializer = ChangePasswordSerializer(instance=self.user, data = data)
        is_valid = serializer.is_valid()
        self.assertFalse(is_valid)
        self.assertEqual(str(serializer.errors['password2'][0]), 'Passwords must match.')

    def test_raise_error_when_password_is_not_valid(self):
        """
        Ensure that error is raised when password is not valid.
        """
        data = self.correct_data
        data['password'] = 'password'
        data['password2'] = 'password'
        serializer = ChangePasswordSerializer(instance=self.user, data = data)
        is_valid = serializer.is_valid()
        self.assertFalse(is_valid)
        self.assertEqual(str(serializer.errors['password'][0]), 'This password is too common.')

    def test_raise_error_when_old_password_is_not_correct(self):
        """
        Ensure that error is raised if old_password value is not correct.
        """
        data = self.correct_data
        data['old_password'] = 'password'
        serializer = ChangePasswordSerializer(instance=self.user, data = data)
        is_valid = serializer.is_valid()
        self.assertFalse(is_valid)
        self.assertEqual(str(serializer.errors['old_password'][0]), 'Wrong password.')
