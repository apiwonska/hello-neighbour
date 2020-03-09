"""
Application of custom user model that extends AbstractUser. Custom user allowes to extend default django user with additional fields.
User registers with username and password. Username has to unique.
For every user and authentication token is automatically generated on user creation.
"""

from django.contrib.auth.models import AbstractUser
from django.db import models
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFill

class CustomUser(AbstractUser):
    """
    Custom user makes possible to add custom fields to django user model.
    Authentication token is generated for every user when the user is created. The logic is in signals.
    """

    status = models.CharField(max_length=50, null=True, blank=True)
    description = models.TextField(max_length=1000, null=True, blank=True)
    avatar = ProcessedImageField(
        upload_to='img/users/avatars',
        processors=[ResizeToFill(250, 250)],
        format='JPEG',
        options={'quality': 60},
        null=True,
        blank=True
        )
    avatar_thumbnail = ImageSpecField(
        source='avatar',
        processors=[ResizeToFill(50, 50)],
        format='JPEG',
        options={'quality': 60}
        )

    def __str__(self):
        return self.username
