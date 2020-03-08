from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Category, Thread, Post

@receiver(post_save, sender=Thread)
def handle_thread_save(sender, instance, **kwargs):
    """
    On saving a new thread, updates threads number in ralated category.
    """
    if kwargs.get('created', False):
        thread = instance
        category = thread.category
        category.threads += 1
        category.save()

@receiver(post_delete, sender=Thread)
def handle_thread_delete(sender, instance, **kwargs):
    """
    On deleting a thread updates threads and posts numbers for category.
    """
    thread = instance
    category = thread.category
    category.posts = category._get_number_of_posts()
    category.threads = category.thread_set.count()
    category.save()

@receiver(post_save, sender=Post)
def handle_post_save(sender, instance, **kwargs):
    """
    When a new post is created:
    - updates posts number in related thread and category,    
    - updates "latest_post_time" field in related thread.
    If the post is saved due to update (post exists), related models won't be changed.
    """ 
    if kwargs.get('created', False):
        post = instance
        thread = post.thread
        thread.posts += 1
        thread._update_latest_post_time(action='add_post', post=post)
        thread.save()

        category = thread.category
        category.posts += 1
        category.save()

@receiver(post_delete, sender=Post)
def handle_post_delete(sender, instance, **kwargs):
    """
    When a post is deleted:
    - updates posts number in related thread and category,    
    - updates "latest_post_time" field in related thread.
    """ 
    post = instance
    thread = post.thread
    thread.posts = thread.post_set.count()
    thread._update_latest_post_time(action='delete_post', post=post)
    thread.save()

    category = thread.category
    category.posts = category._get_number_of_posts()
    category.save()
