from django.urls import reverse
from rest_framework import status, test

from users.models import CustomUser


class RegistrationTestCase(test.APITestCase):

    url = reverse('registration-list')

    def test_registration_with_correct_data(self):
        """
        Ensure we can create a new account object.
        """
        data = {
            'username': 'testUser',
            'email': 'test@registration.com',
            'password': 'p@ssword123',
            'password2': 'p@ssword123'
            }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CustomUser.objects.filter(username=data['username']).count(), 1)
        self.assertEqual(response.data, {'username': 'testUser', 'email': 'test@registration.com'})

    def test_registration_with_invalid_username(self):
        """
        Ensure we can't create a new account if the username is not valid.
        """
        data = {
            'username': 't',
            'email': 'test@user.com',
            'password': 'p@ssword123',
            'password2': 'p@ssword123'
            }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['username'][0].code, 'invalid')


    def test_registration_with_username_of_existing_user(self):
        """
        Ensure we can't create a new account if user with given username already exists.
        """
        CustomUser.objects.create_user(username='testUser', email='test@user.com', password='p@ssword123')
        data = {
            'username': 'testUser',
            'email': 'test@registration.com',
            'password': 'p@ssword123',
            'password2': 'p@ssword123'
            }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['username'][0].code, 'unique')
    
    def test_registration_with_email_of_existing_user(self):
        """
        Ensure we can't create a new account if user with given email already exists.
        """
        CustomUser.objects.create_user(username='testUser', email='test@user.com', password='p@ssword123')
        data = {
            'username': 'testUserRegistration',
            'email': 'test@user.com',
            'password': 'p@ssword123',
            'password2': 'differentPassword'
            }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['email'][0].code, 'unique')

    def test_registration_with_invalid_email(self):
        """
        Ensure we can't create a new account if the email is not valid.
        """
        data = {
            'username': 'testUserRegistration',
            'email': 'test@user@.com',
            'password': 'p@ssword123',
            'password2': 'p@ssword123'
            }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['email'][0].code, 'invalid')


    def test_registration_with_invalid_password(self):
        """
        Ensure we can't create a new account if the passwords is not va;lid.
        """
        data = {
            'username': 'testUser',
            'email': 'test@registration.com',
            'password': 'password123',
            'password2': 'password123'
            }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['password'][0].code, 'invalid')

    def test_registration_with_passwords_not_matching(self):
        """
        Ensure we can't create a new account if the passwords are not matching.
        """
        data = {
            'username': 'testUser',
            'email': 'test@registration.com',
            'password': 'p@ssword123',
            'password2': 'differentPassword'
            }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
