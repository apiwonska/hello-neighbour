from copy import deepcopy
from datetime import datetime

from django.urls import reverse
from rest_framework import status, test
from rest_framework.authtoken.models import Token

from forum.api.serializers import PostSerializer, UserSerializer
from forum.models import Category, Thread, Post
from users.models import CustomUser


class PostViewSetTestCase(test.APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='user')
        self.category = Category.objects.create(name='category')
        self.thread = Thread.objects.create(title='title', subject='subject', user=self.user, category=self.category)
        self.post = Post.objects.create(content='content1', user=self.user, thread=self.thread)
        self.api_authenticate()

        self.user2 = CustomUser.objects.create_user(username='user2')
        self.category2 = Category.objects.create(name='category2')
        self.thread2 = Thread.objects.create(title='title', subject='subject', user=self.user2, category=self.category2)
        self.post2 = Post.objects.create(content='content2', user=self.user2, thread=self.thread2)

    def api_authenticate(self):
        token = Token.objects.get(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Token { token.key }')
    
    def test_authentication_is_necessary(self):
        """
        Ensure that the user, which is not authenticated will not be able to access the data.
        """
        self.client.force_authenticate(user=None)
        url = reverse('post-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_can_read_post_list(self):
        """
        Ensure that authenticated user can retrieve post list.
        """
        url = reverse('post-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_read_post_list_filtered_by_user(self):
        """
        Ensure that authenticated user can retrieve a list of posts of particular user.
        """
        url = reverse('post-list') + f'?user={self.user.id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)

    def test_can_read_post_list_searched_by_content(self):
        """
        Ensure that authenticated user can retrieve a list of posts that contains particular string.
        """
        url = reverse('post-list') + f'?search=content1'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
    
    def test_can_read_post_detail(self):
        """
        Ensure, that authenticated user can retrieve a single post.
        """
        url = reverse('post-detail', kwargs={ 'pk': self.post.id })
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_can_create_post_correctly(self):
        """
        Ensure, that authenticated user can create a post.
        """
        url = reverse('post-list')
        data = {
            'content': 'new content',
            'thread': self.thread.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user']['id'], self.user.id)
    
    def test_can_update_user_own_post_with_put_method(self):
        """
        Ensure that authenticated user can update his own post.
        """
        url = reverse('post-detail', kwargs={ 'pk': self.post.id })
        data = {
            'content': 'new content',
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_can_update_user_own_post_with_patch_method(self):
        """
        Ensure that authenticated user can update his own post.
        """
        url = reverse('post-detail', kwargs={ 'pk': self.post.id })
        data = {
            'content': 'new content',
        }
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], data['content'])

    def test_cant_update_other_users_post(self):
        """
        Ensure it's not possible to change other users post.
        """
        url = reverse('post-detail', kwargs={ 'pk': self.post2.id })
        data = {
            'content': 'new content'
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_can_update_post_will_update_only_selected_fields(self):
        """
        Ensure only content and subject fields can be updated.
        """
        # Create a copy of initial post (as a dict) for comparison
        old_post = deepcopy(self.post.__dict__)
        
        url = reverse('post-detail', kwargs={ 'pk': self.post.id })
        data = {
            'content': 'new content',
            'user': self.user2,
            'thread': self.thread2,
            'created': datetime(2010, 1,1),
            'updated':  datetime(2010,3,1)
        }
        response = self.client.put(url, data)
        self.post.refresh_from_db()
        updated_post = self.post.__dict__

        fields = ['id', 'content', 'user_id', 'thread_id', 'created', 'updated']

        # Check which attributs were updated
        updated_fields = {}
        for k in fields:
            new_value = updated_post[k]
            old_value = old_post[k]
            if new_value != old_value:
                updated_fields[k] = new_value

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertCountEqual(updated_fields.keys(), ['content', 'updated'])
        self.assertEqual(updated_post['content'], data['content'])
        self.assertNotEqual(updated_post['updated'], data['updated'])
    
    def test_user_can_delete_his_post(self):
        """
        Ensure that user can delete his post.
        """
        url = reverse('post-detail', kwargs={ 'pk': self.post.id })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_user_cant_delete_other_user_post(self):
        """
        Ensure that user can't delete other user post.
        """
        url = reverse('post-detail', kwargs={ 'pk': self.post2.id })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
