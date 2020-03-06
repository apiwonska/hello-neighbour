from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Category, Thread, Post

@receiver(post_save, sender=Thread)
def update_threads_number(sender, instance, **kwargs):
    """
    On saving a new thread, updates threads number in ralated category.
    """
    if kwargs.get('created', False):
        thread = instance
        category = thread.category
        category.threads += 1
        category.save()

@receiver(post_delete, sender=Thread)
def update_category_posts_and_threads(sender, instance, **kwargs):
    """
    On deleting a thread updates threads and posts numbers for category.
    """
    thread = instance
    category = thread.category
    category.posts = category.get_number_of_posts()
    category.threads = category.thread_set.count()
    category.save()

@receiver([post_save, post_delete], sender=Post)
def update_posts_number(sender, instance, **kwargs):
    """
    Update posts number in ralated thread and category.
    If the post is saved due to update (post exists), related models won't be updated.
    """ 
    if not kwargs.get('created', True):
        return

    post=instance
    thread = post.thread
    thread.posts = thread.post_set.count()
    thread.save()

    category = thread.category
    category.posts = category.get_number_of_posts()
    category.save()
