from django.conf import settings
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.urls import reverse
from rest_framework.authtoken.models import Token

from users.models import CustomUser


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """
    If a new user was created it will create an auth token for the user. 
    """
    if created:
        Token.objects.create(user=instance)
    
@receiver(pre_save, sender=settings.AUTH_USER_MODEL)
def change_auth_token(sender, instance=None, created=False, **kwargs):
    """
    It will create a new auth token for the user if user's password was updated.
    """
    user = instance
    if user:
        new_password = user.password
        try: 
            old_password = CustomUser.objects.get(id = user.id).password
        except CustomUser.DoesNotExist:
            return
        if new_password != old_password:
            if hasattr(user, 'auth_token'):
                user.auth_token.delete()
            token, created = Token.objects.get_or_create(user=user)

@receiver(pre_save, sender=CustomUser)
def add_default_picture(sender, instance, **kwargs):
    """
    Add default avatar picture if avatar field is blank.
    """
    user = instance
    if user.avatar == '':
        user.avatar = 'users/blank-profile-picture.jpeg'
