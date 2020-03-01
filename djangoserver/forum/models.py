"""
A basic forum model with corresponding category, thread, post models.
"""

from django.db import models
from django.db.models.signals import post_save, post_delete

from users.models import CustomUser as User

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
   
    # pylint: disable=arguments-differ
    def delete(self, *args, **kwargs):
        """Updates fileds posts in related thread and category objects."""
        thread = self.thread
        thread.posts = thread.post_set.count()
        thread.save()

        category = self.thread.category
        category.posts = category.get_number_of_posts()
        category.save()

        super().delete(*args, **kwargs)


def update_threads_number(sender, instance, **kwargs):
    """
    Update thread number in ralated category.
    """
    thread = instance
    category = thread.category
    category.threads = category.thread_set.count()
    category.save()    

post_save.connect(update_threads_number, sender=Thread)

def update_category_posts_and_threads(sender, instance, **kwargs):
    """
    Updates threads and posts numbers for category in case of deleting the thread.
    """
    thread = instance
    category = thread.category
    category.posts = category.get_number_of_posts()
    category.threads = category.thread_set.count()

post_delete.connect(update_category_posts_and_threads, sender=Thread)

def update_posts_number(sender, instance, **kwargs):
    """
    Update posts number in ralated thread and category.
    """
    post=instance
    thread = post.thread
    thread.posts = thread.post_set.count()
    thread.save()

    category = thread.category
    category.posts = category.get_number_of_posts()
    category.save()

post_save.connect(update_posts_number, sender=Post)

post_delete.connect(update_posts_number, sender=Post)
