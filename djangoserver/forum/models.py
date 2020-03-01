"""
A basic forum model with corresponding category, thread, post models.
"""

from django.db import models

from users.models import CustomUser as User
# from . import signals

class Category(models.Model):
    """Model definition for Category."""

    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=100)
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
    
    title = models.CharField(max_length=200)
    subject = models.TextField(max_length=2000)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    sticky = models.BooleanField(blank=True, default=False)
    closed = models.BooleanField(blank=True, default=False)
    posts = models.IntegerField(default=0, editable=False)
    latest_post_time = models.DateTimeField(null=True, blank=True)
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

    content = models.TextField(max_length=2000)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    views = models.IntegerField(default=0, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta definition for Post."""

        ordering = ['-created']

    def __str__(self):
        """Unicode representation of Post."""
        return str(self.id)

