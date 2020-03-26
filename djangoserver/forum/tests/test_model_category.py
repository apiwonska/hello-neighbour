from django.core.exceptions import ValidationError
from django.test import TestCase

from forum.models import Category, Post, Thread
from users.models import CustomUser


class CategoryModelTestCase(TestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='user')
        self.category = Category.objects.create(name='category')
        self.thread1 = Thread.objects.create(title='thread1 title',subject='thread1 subject', user=self.user, category=self.category)
        self.post1 = Post.objects.create(content='post1 content', user=self.user, thread=self.thread1)

    def test_name_is_unique(self):
        """
        Ensure category name is unique.
        """
        name = self.category._meta.get_field('name')

        self.assertEqual(name.unique, True)

    def test_name_max_length(self):
        """
        Ensure category name is not longer than 50 characters.
        """
        name = self.category._meta.get_field('name')

        self.assertEqual(name.max_length, 50)

    def test_name_shorter_than_3_not_valid(self):
        """
        Ensure category name is not shorter than 3 characters.
        """
        self.category.name = 'qw'

        self.assertRaises(ValidationError, self.category.full_clean)
        self.assertRaisesMessage(ValidationError, 'Ensure this value has at least 3 characters (it has 2).', self.category.full_clean)

    def test_description_max_length(self):
        """
        Ensure category description is not longer than 500 characters.
        """
        description = self.category._meta.get_field('description')

        self.assertEqual(description.max_length, 500)

    def test_description_not_required(self):
        """
        Ensure category description is not required.
        """
        description = self.category._meta.get_field('description')

        self.assertEqual(description.blank, True)
        self.assertEqual(description.null, True)

    def test_threads_number_default_0(self):
        """
        Ensure threads field default value is 0.
        """
        threads = self.category._meta.get_field('threads')

        self.assertEqual(threads.default, 0)

    def test_threads_value_update_after_thread_is_added(self):
        """
        Ensure thread field is updated after a new thread is added to category.
        (This behaviour is handled by handle_thread_save signal.)
        """
        self.assertEqual(self.category.threads, 1)        
        Thread.objects.create(title='test thread title', subject='test thread subject', user=self.user, category=self.category)

        self.assertEqual(self.category.threads, 2)

    def test_threads_value_update_after_thread_is_deleted(self):
        """
        Ensure thread field is updated after a category thread is deleted.
        (This behaviour is handled by handle_thread_delete signal.)
        """
        self.assertEqual(self.category.threads, 1)
        Thread.objects.filter(category=self.category).first().delete()
        self.category.refresh_from_db()

        self.assertEqual(self.category.threads, 0)

    def test_posts_number_default_0(self):
        """
        Ensure posts number default value is 0.
        """
        posts = self.category._meta.get_field('posts')

        self.assertEqual(posts.default, 0)

    def test_posts_value_update_after_post_is_added(self):
        """
        Ensure post field is updated after a new post is added to category.
        (This behaviour is handled by handle_post_save signal.)
        """
        self.assertEqual(self.category.posts, 1)
        Post.objects.create(content='test post content', user=self.user, thread=self.thread1)

        self.assertEqual(self.category.posts, 2)

    def test_posts_value_update_after_post_is_deleted(self):
        """
        Ensure post field is updated after a category post is deleted.
        (This behaviour is handled by handle_post_delete signal.)
        """
        self.assertEqual(self.category.posts, 1)
        Post.objects.filter(thread=self.thread1).first().delete()
        self.category.refresh_from_db()

        self.assertEqual(self.category.posts, 0)

    def test_method_get_number_of_posts(self):
        """
        Ensures method _get_number_of_posts returns total number of posts for category.
        """
        thread = Thread.objects.create(title='thread title', subject='thread subject', user=self.user, category=self.category)
        Post.objects.create(content='test post content', user=self.user, thread=thread)

        self.assertEqual(self.category._get_number_of_posts(), 2)
    
    def test_category_str_representation_is_name(self):
        """
        Ensure category string representation is equal to name.
        """
        self.assertEqual(str(self.category), self.category.name)
