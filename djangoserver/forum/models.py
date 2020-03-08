"""
A basic forum model with corresponding category, thread, post models.

The logic for updates of related models on save or delete of the instance is in signals.
"""

from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AnonymousUser

from users.models import CustomUser as User

def get_dummy_user():
    return User.objects.get_or_create(username='user_deleted')[0]

class Category(models.Model):
    """Category is a collection of threads.
    
    Threads and posts field are automatically updated on thread/post save or delete.
    """

    name = models.CharField(max_length=50, unique=True, validators=[MinLengthValidator(1)])
    description = models.TextField(max_length=500)
    ordering = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name='display order')
    threads = models.IntegerField(default=0, editable=False)
    posts = models.IntegerField(default=0, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta definition for Category."""
        verbose_name_plural = 'categories'
        ordering = ['ordering', 'name']

    def __str__(self):
        """Unicode representation of Category."""
        return self.name

    def _get_number_of_posts(self):
        """Returns a number of posts in category."""
        thread_posts_list = [thread.posts for thread in self.thread_set.all()]
        category_posts = sum(thread_posts_list)
        return category_posts


class Thread(models.Model):
    """Thread belongs to category and is a collection of posts.
    
    Threads can be closed or sticky, which alters their behaviour on thread listing.
    Posts and latest_post_time field are automatically updated on post save or delete.
    When a thread is created or deleted, Category thread and post fields are updated. The logic is in signals.
    """
    
    title = models.CharField(max_length=100, validators=[MinLengthValidator(1)])
    subject = models.TextField(max_length=2000, validators=[MinLengthValidator(1)])
    user = models.ForeignKey(User, on_delete=models.SET(get_dummy_user))
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    sticky = models.BooleanField(blank=True, default=False)
    closed = models.BooleanField(blank=True, default=False)
    posts = models.IntegerField(default=0, editable=False)
    latest_post_time = models.DateTimeField(null=True, blank=True, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta definition for Thread."""

        ordering = ['-sticky', '-created']

    def __str__(self):
        """Unicode representation of Thread."""
        return self.title
    
    def _update_latest_post_time(self, action, **kwargs):
        if action == 'add_post':
            self.latest_post_time = kwargs.get('post').created
            self.save()
            return
        elif action == 'delete_post':
            posts = Post.objects.filter(thread=self.id)
            if len(posts) == 0:
                self.latest_post_time = None
                self.save()
            else:
                latest_post = posts.order_by('-created')[0]
                self.latest_post_time = latest_post.created
                self.save()


class Post(models.Model):
    """Post belong to a thread.

    When a post is created or deleted, Thread and Category posts and latest_post_time fields are updated. The logic is in signals.
    """

    content = models.TextField(max_length=2000, validators=[MinLengthValidator(1)])
    user = models.ForeignKey(User, on_delete=models.SET(get_dummy_user))
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta definition for Post."""

        ordering = ['-created']

    def __str__(self):
        """Unicode representation of Post."""
        return 'Post ID:' + str(self.id)
    
