from django.urls import reverse
from rest_framework import test, status
from rest_framework.authtoken.models import Token

from forum.models import Category
from users.models import CustomUser


class CategoryViewSetTestCase(test.APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='user')
        self.category = Category.objects.create(name='category name')
        self.api_authenticate()
    
    def api_authenticate(self):
        token = Token.objects.get(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Token { token.key }')

    def test_authentication_is_necessary(self):
        """
        Ensure, that the user, which is not authenticated will not be able to access the data.
        """
        self.client.force_authenticate(user=None)
        url = reverse('category-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_method_post_not_allowed(self):
        """
        Ensure it's not allowed to create a new category.
        """
        url = reverse('category-list')
        data = {}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def test_method_put_not_allowed(self):
        """
        Ensure it's not allowed to update category.
        """
        url = reverse('category-detail', kwargs={ 'pk': self.category.id })
        data = {}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def test_method_patch_not_allowed(self):
        """
        Ensure it's not allowed to update category.
        """
        url = reverse('category-detail', kwargs={ 'pk': self.category.id })
        data = {}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def test_can_read_category_list(self):
        """
        Ensure, that authenticated user can retrieve a list of categories.
        """
        url = reverse('category-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_can_read_category_detail(self):
        """
        Ensure, that authenticated user can retrieve a single category. 
        """
        url = reverse('category-detail', kwargs={'pk': self.category.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

