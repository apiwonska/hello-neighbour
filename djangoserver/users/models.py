"""
Applies custom user model  
"""

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):

    # description = models.TextField(max_length=500, null=True, blank=True)
    # img = 

    def __str__(self):
        return self.username
