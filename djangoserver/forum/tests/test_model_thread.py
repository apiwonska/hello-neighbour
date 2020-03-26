from django.core.exceptions import ValidationError
from django.test import TestCase
from django.core.exceptions import ObjectDoesNotExist

from forum.models import Category, Post, Thread
from users.models import CustomUser


class ThreadModelTestCase(TestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(username='user')
        self.category = Category.objects.create(name='category')
        self.thread1 = Thread.objects.create(title='thread1 title',subject='thread1 subject', user=self.user, category=self.category)
        self.post1 = Post.objects.create(content='content', user=self.user, thread=self.thread1)
        self.post2 = Post.objects.create(content='content', user=self.user, thread=self.thread1)

    def test_title_is_max_100_length(self):
        title = self.thread1._meta.get_field('title')
        self.assertEqual(title.max_length, 100)

    def test_title_is_min_3_length(self):
        """
        Ensure that for title less than 3 characters long ValidationError is raised.
        """
        self.thread1.title = 'q'
        self.assertRaises(ValidationError, self.thread1.full_clean)
        self.assertRaisesMessage(ValidationError, 'Ensure this value has at least 3 characters (it has 1).', self.thread1.full_clean)

    def test_subject_is_max_2000_length(self):
        """
        Ensure subject length is maximum 2000 characters length.
        """
        subject = self.thread1._meta.get_field('subject')
        self.assertEqual(subject.max_length, 2000)
    
    def test_on_delete_user_is_set_to_obj_user_deleted(self):
        """
        Ensure user field is set to `user_deleted` after thread author account is deleted.
        """
        self.user.delete()
        self.thread1.refresh_from_db()
        user_deleted = CustomUser.objects.get(username='user_deleted')
        self.assertEqual(self.thread1.user, user_deleted)
    
    def test_thread_is_deleted_on_delete_category(self):
        """
        Ensure thread is deleted after related category is deleted.
        """
        self.category.delete()
        self.assertRaises(ObjectDoesNotExist, lambda: Thread.objects.get(title='thread1 title'))
    
    def test_sticky_false_by_default(self):
        """
        Ensure sticky is False by default.
        """
        sticky = self.thread1._meta.get_field('sticky')
        self.assertFalse(sticky.default)
    
    def test_closed_false_by_default(self):
        """
        Ensure closed is False by default.
        """
        closed = self.thread1._meta.get_field('closed')
        self.assertFalse(closed.default)
    
    def test_posts_default_is_0(self):
        """
        Ensure posts (number) default value is 0.
        """
        posts = self.thread1._meta.get_field('posts')
        self.assertEqual(posts.default, 0)

    def test_posts_updated_after_post_added(self):
        """
        Ensure posts field is updated when new post is added to the thread.
        (This behaviour is handled by handle_post_save signal.)
        """
        self.assertEqual(self.thread1.posts, 2)
        Post.objects.create(content='test post content', user=self.user, thread=self.thread1)
        self.assertEqual(self.thread1.posts, 3)
    
    def test_posts_value_update_after_post_is_deleted(self):
        """
        Ensure post field is updated after a post in the thread is deleted.
        (This behaviour is handled by handle_post_delete signal.)
        """
        self.assertEqual(self.thread1.posts, 2)
        Post.objects.filter(thread=self.thread1).first().delete()
        self.thread1.refresh_from_db()
        self.assertEqual(self.thread1.posts, 1)

    def test_latest_post_time_equals_post_created_value(self):
        """
        Ensure latest_post_time is equal to post.created value.
        """
        self.assertEqual(self.thread1.latest_post_time, self.post2.created)
    
    def test_latest_post_time_is_none_if_there_are_no_posts(self):
        """
        Ensure latest_post_time is equal to None if there are no posts in the thread.
        """
        Post.objects.all().delete()
        self.thread1.refresh_from_db()

        self.assertEqual(self.thread1.latest_post_time, None)

    def test_latest_post_time_updated_after_post_added(self):
        """
        Ensure latest_post_time is updated when the new post is added the the thread.
        """
        new_post = Post.objects.create(content='test post content', user=self.user, thread=self.thread1)

        self.assertEqual(self.thread1.latest_post_time, new_post.created)
    
    def test_latest_post_time_updated_after_post_deleted(self):
        """
        Ensure latest_post_time is updated when the new post is added the the thread.
        """
        self.assertTrue(self.post1.created < self.post2.created)
        self.assertEqual(self.thread1.latest_post_time, self.post2.created)
        self.post2.delete()
        
        self.assertEqual(self.thread1.latest_post_time, self.post1.created)

    def test_thread_str_representation_is_title(self):
        """
        Ensure thread string representation is equal to title.
        """
        self.assertEqual(str(self.thread1), self.thread1.title)