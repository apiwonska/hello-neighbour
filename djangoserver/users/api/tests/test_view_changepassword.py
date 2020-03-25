from django.urls import reverse
from rest_framework import status, test
from rest_framework.authtoken.models import Token

from users.models import CustomUser


class ChangePasswordTestCase(test.APITestCase):

    url = reverse('change-password')

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testUser', email='test@user.com', password='p@ssword123')
        self.token = Token.objects.get(user=self.user)

    def api_authenticate(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_change_password_with_correct_data(self):
        """
        Ensure that user can change a password.
        After changing the password user should get the new token in the response.
        """
        data = {
            'old_password': 'p@ssword123',
            'password': 'p@ssword1234',
            'password2': 'p@ssword1234'
        }
        self.api_authenticate()
        response = self.client.patch(self.url, data, format='json')
        new_token = Token.objects.get(user = self.user)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['token'], new_token.key)

    def test_change_password_when_not_authenticated(self):
        """
        Ensure that user can't change password, without authentication.
        """
        data = {
            'old_password': 'p@ssword123',
            'password': 'p@ssword1234',
            'password2': 'p@ssword1234'
        }
        response = self.client.patch(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_change_password_with_wrong_old_password(self):
        """
        Ensure that user can't change password, without correct old_password.
        """
        data = {
            'old_password': 'wrongPassoword',
            'password': 'p@ssword1234',
            'password2': 'p@ssword1234'
        }
        self.api_authenticate()
        response = self.client.patch(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_change_password_with_passwords_not_matching(self):
        """
        Ensure that user can't change password, if passwords don't match match.
        """
        data = {
            'old_password': 'p@ssword123',
            'password': 'p@ssword1234',
            'password2': 'differentPassword'
        }
        self.api_authenticate()
        response = self.client.patch(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
