"""
A basic forum model with corresponding category, thread, post models.
"""

from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AnonymousUser

from users.models import CustomUser as User

def get_dummy_user():
    return User.objects.get_or_create(username='user_deleted')[0]

class Category(models.Model):
    """Model definition for Category."""

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

    def get_number_of_posts(self):
        """Returns a number of posts in category."""
        thread_posts_list = [thread.posts for thread in self.thread_set.all()]
        category_posts = sum(thread_posts_list)
        return category_posts


class Thread(models.Model):
    """Model definition for Thread."""
    
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
    

class Post(models.Model):
    """Model definition for Post."""

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

