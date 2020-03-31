import tempfile
import time
from datetime import datetime
from urllib.parse import urlparse

from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from PIL import Image
from rest_framework import status, test
from rest_framework.authtoken.models import Token

from users.models import CustomUser


class UserViewSetTestCase(test.APITestCase):
    temp_dir = None

    @classmethod
    def setUpClass(cls):
        cls.temp_dir = tempfile.TemporaryDirectory()
        super().setUpClass()

    @classmethod
    def tearDownClass(cls):
        cls.temp_dir = None
        super().tearDownClass()

    list_url = reverse('user-list')

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testUser', email='test@user.com', password='p@ssword123')
        self.user2 = CustomUser.objects.create_user(username='testUser2', email='test@user2.com', password='p@ssword123')
        self.token = Token.objects.get(user=self.user)
        self.api_authenticate()

    def tearDown(self):
        self.user.delete()
        self.user2.delete()

    def api_authenticate(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def is_absolute(self, url):
        return bool(urlparse(url).netloc)

    def test_retrieve_user_list_authenticated(self):
        """
        Authenticated user can retrieve user's data.
        """
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_retrieve_user_list_not_authenticated(self):
        """
        Unauthenticated user are not allowed to retrieve user's data.
        """
        self.client.force_authenticate(user=None)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrive_users_own_profile(self):
        """
        Fields that should be retrieved: id, username, email, date_joined, status, description, avatar.
        """
        url = reverse('user-detail', kwargs={ "pk": self.user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(set(response.data.keys()), set(['id', 'username', 'email', 'date_joined', 'status', 'description', 'avatar']))

    def test_retrive_other_users_profile(self):
        """ 
        Fields that should be retrieved: id, username, date_joined, status, description, avatar.
        User should not get other users email information.
        """
        url = reverse('user-detail', kwargs={ "pk": self.user2.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(set(response.data.keys()), set(['id', 'username', 'date_joined', 'status', 'description', 'avatar']))

    def test_retrieve_user_own_profile_avatar_is_absolute_url(self):
        """
        Ensure that avatar field is absolute url. Retrieve single user object, user's own profile.
        """
        url = reverse('user-detail', kwargs={ "pk": self.user.id })
        response = self.client.get(url)
        avatar_url = response.data['avatar']
        self.assertTrue(self.is_absolute(avatar_url))

    def test_retrieve_other_user_profile_avatar_is_absolute_url(self):
        """
        Ensure that avatar field is absolute url. Retrieve single object, other user's profile.
        """
        url = reverse('user-detail', kwargs={ "pk": self.user.id })
        response = self.client.get(url)
        avatar_url = response.data['avatar']
        self.assertTrue(self.is_absolute(avatar_url))
    
    def test_retrieve_users_list_avatar_is_absolute_url(self):
        """
        Ensure that avatar field is absolute url. Retrieve a list of users objects.
        """
        url = reverse('user-list')
        response = self.client.get(url)
        avatar_url = response.data['results'][0]['avatar']
        self.assertTrue(self.is_absolute(avatar_url))
    
    def test_create_user_not_allowed(self):
        """
        User is not allowed to create new user object.
        """
        data = {}
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user_own_profile_data_using_patch(self):
        """
        Ensure that the user can update information in his own profile. 
        Only `email`, `status` and `description` fields should be updated.
        Request is made with PATH method.
        """
        url = reverse('user-detail', kwargs={ "pk": self.user.id})
        data = {
            'username': 'updateUsername',
            'email': 'update.emailr@test.com',
            'status': 'status update',
            'description': 'description update',            
            'date_joined': datetime(2020,2,1)
        }
        response = self.client.patch(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Updated fields
        self.assertEqual(response.data['email'], 'update.emailr@test.com')
        self.assertEqual(response.data['status'], 'status update')
        self.assertEqual(response.data['description'], 'description update')
        # Fields that should remain unchanged
        self.assertNotEqual(response.data['username'], 'updateUsername')
        self.assertNotEqual(response.data['date_joined'], datetime(2020,2,1))

    def test_update_user_own_profile_data_using_put(self):
        """
        Ensure that the user can update information in his own profile. 
        Only `email`, `status` and `description` fields should be updated.
        Request is made with PUT method.
        """
        url = reverse('user-detail', kwargs={ "pk": self.user.id})
        data = {
            'username': 'updateUsername',
            'email': 'update.emailr@test.com',
            'status': 'status update', 
            'description': 'description update',            
            'date_joined': datetime(2020,2,1)
        }
        response = self.client.put(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Updated fields
        self.assertEqual(response.data['email'], 'update.emailr@test.com')
        self.assertEqual(response.data['status'], 'status update')
        self.assertEqual(response.data['description'], 'description update')
        # Fields that should remain unchanged
        self.assertNotEqual(response.data['username'], 'updateUsername')
        self.assertNotEqual(response.data['date_joined'], datetime(2020,2,1))
    
    def test_update_user_own_profile_img(self):
        """
        Ensure that the user can update avatar in his own profile. 
        Request is made with PUT method.
        Ensure avatar in response object is absolute url.
        """
        with self.settings(MEDIA_ROOT=self.temp_dir.name):
            image = Image.new('RGB', (100, 100))
            tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
            image.save(tmp_file)
            img_path = tmp_file.name
            img_name = f'test_avatar_{int(time.time())}.jpg'
            img = SimpleUploadedFile(name=img_name, content=open(img_path, 'rb').read(), content_type='image/jpg')

            url = reverse('user-detail', kwargs={ "pk": self.user.id})
            data = { 'avatar': img }
            response = self.client.put(url, data, format='multipart')

            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertTrue(self.is_absolute(response.data['avatar']))
            self.assertEqual(response.data['avatar'], f'http://testserver/media/users/{img_name}')

    def test_update_other_user_profile_not_allowed(self):
        """
        Ensure that user can't change the data of the other user.
        """
        url = reverse('user-detail', kwargs={ "pk": self.user2.id})
        data = {
            'status': 'status', 
            'description': 'description'
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_delete_user_not_allowed(self):
        """
        Ensure that it's not possible to delete user.
        """
        url = reverse('user-detail', kwargs={ "pk": self.user2.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
