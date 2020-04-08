from django.conf import settings
from django.core.mail import send_mail
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django_rest_passwordreset.signals import (post_password_reset,
                                               reset_password_token_created)
from rest_framework.authtoken.models import Token


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
        # subject:
        'Password Reset for Forum',
        # message:
        email_plaintext_message,
        # from:
        'noreply@somehost.local',
        # to:
        [reset_password_token.user.email],
    )
