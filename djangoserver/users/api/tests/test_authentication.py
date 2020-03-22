from rest_framework import status, test
from rest_framework.authtoken.models import Token

from users.models import CustomUser


class AuthenticationTestCase(test.APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testUser', email='test@user.com', password='p@ssword123')
        self.token = Token.objects.get(user=self.user)

    def test_authentication_with_correct_data(self):
        """
        Ensure we can authenticate with correct data. 
        The response should contain authentication token.
        """
        url = '/api/token-auth/'
        data = {
            'username': 'testUser',
            'password': 'p@ssword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'token': self.token.key})
    
    def test_authentication_with_wrong_password(self):
        """
        Ensure we can authenticate with correct data. 
        The response should contain authentication token.
        """
        url = '/api/token-auth/'
        data = {
            'username': 'testUser',
            'password': 'wrongPassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_authentication_with_wrong_username(self):
        """
        Ensure we can authenticate with correct data. 
        The response should contain authentication token.
        """
        url = '/api/token-auth/'
        data = {
            'username': 'wrongUser',
            'password': 'p@ssword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
