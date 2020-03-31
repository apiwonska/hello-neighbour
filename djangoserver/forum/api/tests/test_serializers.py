from rest_framework.test import APITestCase

from forum.api.serializers import (CategorySerializer, PostSerializer,
                                   ThreadSerializer, UserSerializer)
from forum.models import Category, Post, Thread
from users.models import CustomUser


class BaseSerializerTestCase(APITestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user = CustomUser.objects.create_user(username='user')

        category_attrs = {
            'name': 'category name', 
            'description': 'category description'
        }
        cls.category = Category.objects.create(**category_attrs)

        thread_attrs = {
            'title': 'thread title',
            'subject': 'thread subject',
            'user': cls.user,
            'category': cls.category
        }
        cls.thread = Thread.objects.create(**thread_attrs)

        post_attrs = {
            'content': 'post content',
            'user': cls.user,
            'thread': cls.thread
        }        
        cls.post = Post.objects.create(**post_attrs)


class UserSerializerTestCase(BaseSerializerTestCase):
    
    def test_serializer_data_contains_expected_fields(self):
        """
        Ensure data property contains expected fields.
        """
        serializer = UserSerializer(instance=self.user)
        fields = ['id', 'username', 'avatar_thumbnail']
        self.assertCountEqual(serializer.data, fields)
    
    def test_avatar_thumbnail_field_is_read_only(self):
        """
        Ensure avatar_thumbnail field is read only.
        """
        serializer = UserSerializer(instance=self.user)
        field = serializer._declared_fields['avatar_thumbnail']
        self.assertTrue(field.read_only)


class CategorySerializerTestCase(BaseSerializerTestCase):

    def test_serializer_data_contains_expected_fields(self):
        """
        Ensure data property contains expected fields.
        """
        serializer = CategorySerializer(instance=self.category)
        fields = ['id', 'name', 'description', 'threads', 'posts']
        self.assertCountEqual(serializer.data, fields)


class ThreadSerializerTestCase(BaseSerializerTestCase):

    def test_serializer_data_contains_expected_fields(self):
        """
        Ensure data property contains expected fields.
        """
        serializer = ThreadSerializer(instance=self.thread)
        fields = ['id', 'title', 'subject', 'user', 'category', 'sticky', 'closed', 'posts', 'latest_post_time', 'created', 'updated']
        self.assertCountEqual(serializer.data, fields)

    def test_user_representation(self):
        """
        Ensure that user field is represented with serialized user object.
        """
        serializer = ThreadSerializer(instance=self.thread)
        self.assertEqual(serializer.data['user'], UserSerializer(instance=self.user).data)


class PostSerializerTestCase(BaseSerializerTestCase):
    
    def test_serializer_data_contains_expected_fields(self):
        """
        Ensure data property contains expected fields.
        """
        serializer = PostSerializer(instance=self.post)
        fields = ['id', 'content', 'user', 'thread', 'created', 'updated']
        self.assertCountEqual(serializer.data, fields)

    def test_user_representation(self):
        """
        Ensure that user field is represented with serialized user object.
        """
        serializer = PostSerializer(instance=self.post)
        self.assertEqual(serializer.data['user'], UserSerializer(instance=self.user).data)
