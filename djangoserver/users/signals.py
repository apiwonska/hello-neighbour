from django.conf import settings
from django.core.mail import send_mail
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django_rest_passwordreset.signals import (post_password_reset,
                                               reset_password_token_created)
from rest_framework.authtoken.models import Token

from users.models import CustomUser


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

@receiver(pre_save, sender=CustomUser)
def add_default_picture(sender, instance, **kwargs):
    """
    Add default avatar picture if avatar field is blank.
    """
    user = instance
    if user.avatar == '':
        user.avatar = 'users/blank-profile-picture.jpeg'

@receiver(post_password_reset)
def create_new_auth_token(sender, user, *args, **kwargs):
    """
    Creates a new token after password reset.
    """
    if hasattr(user, 'auth_token'):
        user.auth_token.delete()
        token, created = Token.objects.get_or_create(user=user)

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """

    host = settings.URL_FRONT
    path = reverse('password_reset:reset-password-request')
    token = reset_password_token.key

    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': f"{host}{path}?token={token}",
        'website_name': 'Forum',
    }
    # render email text
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Forum"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email],
    )
