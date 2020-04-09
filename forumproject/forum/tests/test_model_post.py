from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.test import TestCase

from forum.models import Category, Post, Thread
from users.models import CustomUser


class PostModelTestCase(TestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='user')
        self.category = Category.objects.create(name='category')
        self.thread1 = Thread.objects.create(title='thread1 title',subject='thread1 subject', user=self.user, category=self.category)
        self.post1 = Post.objects.create(content='post1 content', user=self.user, thread=self.thread1)

    def test_content_max_length_2000(self):
        """
        Ensure content is not longer than 2000 characters.
        """
        content = self.post1._meta.get_field('content')

        self.assertEqual(content.max_length, 2000)

    def test_content_is_not_blank(self):
        """
        Ensure content is not empty.
        """
        self.post1.content = ''
        self.assertRaisesMessage(ValidationError, 'This field cannot be blank.', self.post1.full_clean)
    
    def test_on_delete_user_is_set_to_obj_user_deleted(self):
        """
        Ensure user field is set to `user_deleted` after post author account is deleted.
        """
        self.user.delete()
        self.post1.refresh_from_db()
        user_deleted = CustomUser.objects.get(username='user_deleted')
        self.assertEqual(self.post1.user, user_deleted)
    
    def test_post_is_deleted_on_delete_category(self):
        """
        Ensure post is deleted after related thread is deleted.
        """
        self.thread1.delete()
        self.assertRaises(ObjectDoesNotExist, lambda: Post.objects.get(content='post1 content'))
    
    def test_post_str_representation(self):
        """
        Ensure category string representation is equal to `Post ID: <post.id>`
        """
        self.assertEqual(str(self.post1), f'Post ID: {self.post1.id}')
