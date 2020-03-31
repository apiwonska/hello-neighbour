from copy import deepcopy
from datetime import datetime

from django.urls import reverse
from rest_framework import status, test
from rest_framework.authtoken.models import Token

from forum.api.serializers import ThreadSerializer, UserSerializer
from forum.models import Category, Thread
from users.models import CustomUser


class ThreadViewSetTestCase(test.APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='user')
        self.category = Category.objects.create(name='category1')
        self.thread = Thread.objects.create(title='title1', subject='subject1', user=self.user, category=self.category)
        self.api_authenticate()

        self.user2 = CustomUser.objects.create_user(username='user2')
        self.category2 = Category.objects.create(name='category2')
        self.thread2 = Thread.objects.create(title='title2', subject='subject2', user=self.user2, category=self.category2)
    
    def api_authenticate(self):
        token = Token.objects.get(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Token { token.key }')
    
    def test_authentication_is_necessary(self):
        """
        Ensure, that the user, which is not authenticated will not be able to access the data.
        """
        self.client.force_authenticate(user=None)
        url = reverse('thread-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_can_read_thread_list(self):
        """
        Ensure, that authenticated user can retrieve threads list.
        """
        url = reverse('thread-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_can_read_thread_detail(self):
        """
        Ensure, that authenticated user can retrieve a single thread.
        """
        url = reverse('thread-detail', kwargs={ 'pk': self.thread.id })
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_can_read_thread_list_filtered_by_category(self):
        """
        Ensure that authenticated user can retrieve a list of threads for a given category.
        """
        url = reverse('thread-list') + f'?category={self.category.id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)

    def test_can_read_thread_list_searched_by_title(self):
        """
        Ensure that authenticated user can retrieve a list of threads with title that contains particular string.
        """
        url = reverse('thread-list') + f'?search=title1'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)

        url = reverse('thread-list') + f'?search=title'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)
    
    def test_can_read_thread_list_searched_by_subject(self):
        """
        Ensure that authenticated user can retrieve a list of threads with subject that contains particular string.
        """
        url = reverse('thread-list') + f'?search=subject1'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
    
    def test_can_create_thread_correctly(self):
        """
        Ensure, that authenticated user can create a thread.
        """
        url = reverse('thread-list')
        data = {
            'title': 'title2',
            'subject': 'thread subject2',
            'category': self.category.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user']['id'], self.user.id)
    
    def test_can_update_user_own_thread_with_put_method(self):
        """
        Ensure, that authenticated user can update his own thread.
        """
        url = reverse('thread-detail', kwargs={ 'pk': self.thread.id })
        data = {
            'title': 'new title',
            'subject': 'new subject'
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_can_update_user_own_thread_with_patch_method(self):
        """
        Ensure, that authenticated user can update his own thread.
        """
        url = reverse('thread-detail', kwargs={ 'pk': self.thread.id })
        data = {
            'title': 'new title',
            'subject': 'new subject'
        }
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(response.data['subject'], data['subject'])

    def test_cant_update_other_users_thread(self):
        """
        Ensure it's not possible to change other users thread.
        """
        url = reverse('thread-detail', kwargs={ 'pk': self.thread2.id })
        data = {
            'title': 'new title',
            'subject': 'new subject'
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_can_update_only_selected_fields(self):
        """
        Ensure only title and subject fields can be updated.
        """
        # Create a copy of initial thread (as a dict) for comparison
        old_thread = deepcopy(self.thread.__dict__)
        
        url = reverse('thread-detail', kwargs={ 'pk': self.thread.id })
        data = {
            'title': 'new title',
            'subject': 'new subject',
            'user': self.user2,
            'category': self.category2,
            'sticky': True,
            'closed': True,
            'posts': 100,
            'latest_post_time': datetime(2010,3,1),
            'created': datetime(2010, 1,1),
            'updated':  datetime(2010,3,1)
        }
        response = self.client.put(url, data)
        self.thread.refresh_from_db()
        updated_thread = self.thread.__dict__

        # Serializer fields
        fields = ['id', 'title', 'subject', 'user_id', 'category_id', 'sticky', 'closed', 'posts', 'latest_post_time', 'created', 'updated']

        # Check which attributs were updated
        updated_fields = {}
        for k in fields:
            new_value = updated_thread[k]
            old_value = old_thread[k]
            if new_value != old_value:
                updated_fields[k] = new_value

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertCountEqual(updated_fields.keys(), ['title', 'subject', 'updated'])
        self.assertEqual(updated_thread['title'], data['title'])
        self.assertEqual(updated_thread['subject'], data['subject'])
        self.assertNotEqual(updated_thread['updated'], data['updated'])
    
    def test_delete_thread_is_not_allowed(self):
        """
        Ensure that user can't delete the thread.
        """
        url = reverse('thread-detail', kwargs={ 'pk': self.thread.id })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
